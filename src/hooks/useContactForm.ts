"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createContactSchema } from "@/lib/contact-schema";

/**
 * Web3Forms access key (public by design — set in `NEXT_PUBLIC_WEB3FORMS_KEY`).
 * The static site has no server, so the browser submits straight to Web3Forms,
 * which relays the message to the owner's inbox. See `.env.example`.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export type FieldErrors = Partial<Record<string, string[]>>;

export interface UseContactFormReturn {
  status: FormStatus;
  fieldErrors: FieldErrors;
  errorMessage: string | null;
  submit: (data: Record<string, string | boolean | undefined>) => Promise<void>;
  reset: () => void;
}

export function useContactForm(): UseContactFormReturn {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function reset() {
    setStatus("idle");
    setFieldErrors({});
    setErrorMessage(null);
  }

  async function submit(data: Record<string, string | boolean | undefined>) {
    // Clear previous state
    setFieldErrors({});
    setErrorMessage(null);

    // Client-side validation (fast feedback, no network round-trip needed)
    const schema = createContactSchema((key) => t(`errors.${key}`));
    const result = schema.safeParse(data);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    // Honeypot — a filled `website` field means a bot; pretend success silently.
    if (typeof data.website === "string" && data.website.trim().length > 0) {
      setStatus("success");
      return;
    }

    if (!WEB3FORMS_KEY) {
      console.error("[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set.");
      setErrorMessage(t("formError.unavailable"));
      setStatus("error");
      return;
    }

    const { name, email, phone, message } = result.data;
    setStatus("submitting");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from the website — ${name}`,
          name,
          email,
          phone: phone ?? "—",
          message,
        }),
      });

      const json = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !json.success) {
        setErrorMessage(t("formError.sendFailed"));
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(t("formError.network"));
      setStatus("error");
    }
  }

  return { status, fieldErrors, errorMessage, submit, reset };
}
