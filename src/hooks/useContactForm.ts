"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/contact-schema";

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
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await response.json()) as {
        ok?: boolean;
        error?: string;
        errors?: FieldErrors;
      };

      if (!response.ok) {
        if (json.errors) {
          setFieldErrors(json.errors);
        }
        setErrorMessage(
          json.error ??
            "Odeslání se nezdařilo. Zkuste to prosím znovu nebo napište přímo na e-mail.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(
        "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu.",
      );
      setStatus("error");
    }
  }

  return { status, fieldErrors, errorMessage, submit, reset };
}
