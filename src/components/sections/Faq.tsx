import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, titleClasses } from "@/components/ui/Typography";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

type FaqItem = { question: string; answer: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <Section className="border-border border-t">
      <Container width="narrow">
        <Stack gap="xl">
          {/* Section header */}
          <Stack gap="sm">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <Heading as="h2" size="xl">
              {t("heading")}
            </Heading>
          </Stack>

          {/* Accordion using native <details> — accessible, no JS */}
          <div className="divide-border flex w-full flex-col divide-y">
            {items.map((item, i) => (
              <details key={i} className="group py-6 first:pt-0 last:pb-0">
                <summary
                  className={cn(
                    titleClasses("lg"),
                    "text-foreground flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden",
                  )}
                >
                  {item.question}
                  {/* Open/close indicator */}
                  <span
                    className="text-accent shrink-0 text-xl font-light transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-muted mt-4 text-base leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
