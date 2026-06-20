import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, Label, Text } from "@/components/ui/Typography";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact" className="bg-surface border-border scroll-mt-24 border-t">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">
          {/* Form */}
          <div>
            <Stack gap="lg">
              <Stack gap="sm">
                <Eyebrow>{t("eyebrow")}</Eyebrow>
                <Heading as="h2" size="xl">
                  {t("heading")}
                </Heading>
                <Text tone="muted">{t("intro")}</Text>
              </Stack>

              <ContactForm />
            </Stack>
          </div>

          {/* Direct contact */}
          <div className="flex items-start md:justify-end">
            <Stack gap="xl">
              <Stack gap="md">
                <Label>{t("directContact")}</Label>
                <Stack gap="sm">
                  <ContactLinks tone="subtle" className="text-base" />
                </Stack>
              </Stack>

              <Stack gap="md">
                <Label>{t("areaLabel")}</Label>
                <Text tone="muted" size="sm">
                  {t("areaText")}
                </Text>
              </Stack>

              <Stack gap="md">
                <Label>{t("responseLabel")}</Label>
                <Text tone="muted" size="sm">
                  {t("responseText")}
                </Text>
              </Stack>
            </Stack>
          </div>
        </div>
      </Container>
    </Section>
  );
}
