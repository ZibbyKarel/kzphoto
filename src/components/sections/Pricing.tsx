import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, Label, Text, Title } from "@/components/ui/Typography";
import { cn } from "@/lib/cn";
import { pricingPackages } from "@/lib/content";
import { useTranslations } from "next-intl";

export function Pricing() {
  const t = useTranslations("pricing");

  return (
    <Section id="pricing" className="border-border scroll-mt-24 border-t">
      <Container>
        <Stack gap="xl">
          {/* Section header */}
          <div className="max-w-xl">
            <Stack gap="sm">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <Heading as="h2" size="xl">
                {t("heading")}
              </Heading>
            </Stack>
          </div>

          {/*
           * Reveal becomes the card grid so its DIRECT children are the price cards.
           * Grid classes carried from the original div.
           */}
          <Reveal stagger={0.1} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  "flex flex-col gap-6 border p-8",
                  pkg.highlight
                    ? "border-border-strong bg-surface-raised"
                    : "border-border bg-surface",
                )}
              >
                <Stack gap="xs">
                  {pkg.highlight && (
                    <Label tone="accent" className="font-medium">
                      {t("popular")}
                    </Label>
                  )}
                  <Title as="h3">{t(`packages.${pkg.id}.title`)}</Title>
                  <Text tone="muted" size="sm">
                    {t(`packages.${pkg.id}.description`)}
                  </Text>
                </Stack>

                <div className="border-border border-t pt-6">
                  <Title as="p" size="3xl">
                    {t(`packages.${pkg.id}.price`)}
                  </Title>
                </div>

                <ul className="flex flex-1 flex-col gap-2">
                  {(t.raw(`packages.${pkg.id}.features`) as string[]).map((feature) => (
                    <li key={feature} className="text-muted flex items-start gap-2 text-sm">
                      <span className="text-accent mt-0.5 select-none" aria-hidden="true">
                        —
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <ButtonLink href="/#contact" variant={pkg.highlight ? "primary" : "ghost"}>
                  {t("enquire")}
                </ButtonLink>

                {pkg.extraPhotoAvailable && (
                  <Text tone="faint" size="sm" className="-mt-3 text-center">
                    {t("editNote")}
                  </Text>
                )}
              </div>
            ))}
          </Reveal>

          {/* Note */}
          <Text tone="faint" size="sm" className="max-w-xl">
            {t("note")}
          </Text>
        </Stack>
      </Container>
    </Section>
  );
}
