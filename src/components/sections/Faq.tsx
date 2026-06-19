import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { faqItems } from "@/lib/content";

export function Faq() {
  return (
    <Section className="border-border border-t">
      <Container width="narrow">
        <Stack gap="xl">
          {/* Záhlaví */}
          <Stack gap="sm">
            <Eyebrow>Otázky a odpovědi</Eyebrow>
            <Heading as="h2" size="xl">
              Nejčastější otázky
            </Heading>
          </Stack>

          {/* Accordion pomocí nativního <details> — přístupný, bez JS */}
          <div className="divide-border flex flex-col divide-y">
            {faqItems.map((item) => (
              <details key={item.id} className="group py-6 first:pt-0 last:pb-0">
                <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                  {item.question}
                  {/* Indikátor otevření */}
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
