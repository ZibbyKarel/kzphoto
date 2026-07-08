import { describe, expect, it } from "vitest";
import { createContactSchema } from "./contact-schema";

// Identity translator — tests assert on structure/success, not localized copy.
const t = (key: string) => key;

const validInput = {
  name: "Karel Zíbar",
  email: "karel@example.com",
  phone: "+420722616617",
  message: "Hello, I would like to book a session for a family shoot next month.",
  gdpr: true,
  website: "",
};

describe("createContactSchema", () => {
  it("accepts a fully valid submission", () => {
    const schema = createContactSchema(t);
    const result = schema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts a valid submission without the optional phone field", () => {
    const schema = createContactSchema(t);
    const withoutPhone: Record<string, unknown> = { ...validInput };
    delete withoutPhone.phone;
    const result = schema.safeParse(withoutPhone);
    expect(result.success).toBe(true);
  });

  it("rejects a name shorter than 2 characters", () => {
    const schema = createContactSchema(t);
    const result = schema.safeParse({ ...validInput, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects a name longer than 100 characters", () => {
    const schema = createContactSchema(t);
    const result = schema.safeParse({ ...validInput, name: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const schema = createContactSchema(t);
    const result = schema.safeParse({ ...validInput, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    const schema = createContactSchema(t);
    const result = schema.safeParse({ ...validInput, message: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects a message longer than 2000 characters", () => {
    const schema = createContactSchema(t);
    const result = schema.safeParse({ ...validInput, message: "a".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("rejects gdpr: false — the checkbox must be explicitly checked (z.literal(true))", () => {
    const schema = createContactSchema(t);
    const result = schema.safeParse({ ...validInput, gdpr: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.gdpr).toBeDefined();
    }
  });

  it("rejects a missing gdpr field", () => {
    const schema = createContactSchema(t);
    const withoutGdpr: Record<string, unknown> = { ...validInput };
    delete withoutGdpr.gdpr;
    const result = schema.safeParse(withoutGdpr);
    expect(result.success).toBe(false);
  });

  it("accepts any string in the honeypot `website` field at the schema level (rejection is app-level)", () => {
    // The schema itself only marks `website` optional; honeypot enforcement
    // happens in useContactForm, not in validation, so a filled value should
    // still pass schema validation.
    const schema = createContactSchema(t);
    const result = schema.safeParse({ ...validInput, website: "http://spam.example" });
    expect(result.success).toBe(true);
  });

  it("uses the provided translator for error messages", () => {
    const schema = createContactSchema((key) => `translated:${key}`);
    const result = schema.safeParse({ ...validInput, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name?.[0]).toBe("translated:nameMin");
    }
  });
});
