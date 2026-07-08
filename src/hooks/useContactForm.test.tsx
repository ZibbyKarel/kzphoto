import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { useContactForm } from "./useContactForm";
import messages from "../../messages/cs.json";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="cs" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

const validData = {
  name: "Karel Zíbar",
  email: "karel@example.com",
  phone: "",
  message: "Hello, I would like to book a session for a family shoot next month.",
  gdpr: true,
  website: "",
};

describe("useContactForm", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("starts idle with no errors", () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });
    expect(result.current.status).toBe("idle");
    expect(result.current.fieldErrors).toEqual({});
    expect(result.current.errorMessage).toBeNull();
  });

  it("rejects invalid data with field errors and never calls fetch", async () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit({ ...validData, name: "A" });
    });

    expect(result.current.fieldErrors.name).toBeDefined();
    expect(result.current.status).toBe("idle");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects submissions missing GDPR consent", async () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit({ ...validData, gdpr: false });
    });

    expect(result.current.fieldErrors.gdpr).toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("honeypot: a filled `website` field silently reports success without calling fetch", async () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit({ ...validData, website: "http://spam.example" });
    });

    expect(result.current.status).toBe("success");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("honeypot: a whitespace-only `website` field is treated as empty (submits normally)", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit({ ...validData, website: "   " });
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("submits valid data to Web3Forms and reports success", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit(validData);
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("reports an error status when the Web3Forms response indicates failure", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false }),
    });

    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit(validData);
    });

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.errorMessage).toBeTruthy();
  });

  it("reports a network error when fetch rejects", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("network down"));

    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit(validData);
    });

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.errorMessage).toBeTruthy();
  });

  it("reset() clears status, field errors, and error message", async () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.submit({ ...validData, name: "A" });
    });
    expect(result.current.fieldErrors.name).toBeDefined();

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.fieldErrors).toEqual({});
    expect(result.current.errorMessage).toBeNull();
  });
});
