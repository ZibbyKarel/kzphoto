import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  return (
    <Section id="kontakt" className="bg-surface border-border scroll-mt-24 border-t">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">
          {/* Formulář */}
          <div>
            <Stack gap="lg">
              <Stack gap="sm">
                <Eyebrow>Kontakt</Eyebrow>
                <Heading as="h2" size="xl">
                  Pojďme se potkat
                </Heading>
                <Text tone="muted">
                  Napište mi a do 48 hodin se ozvu. Rád odpovím na všechny otázky.
                </Text>
              </Stack>

              <ContactForm />
            </Stack>
          </div>

          {/* Přímý kontakt */}
          <div className="flex items-start md:justify-end">
            <Stack gap="xl">
              <Stack gap="md">
                <p className="text-faint text-xs tracking-[0.2em] uppercase">Přímý kontakt</p>
                <Stack gap="sm">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-foreground hover:text-accent text-base transition-colors"
                  >
                    {site.email}
                  </a>
                  <a
                    href={site.phoneHref}
                    className="text-foreground hover:text-accent text-base transition-colors"
                  >
                    {site.phone}
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent text-base transition-colors"
                  >
                    Instagram {site.instagramHandle}
                  </a>
                </Stack>
              </Stack>

              <Stack gap="md">
                <p className="text-faint text-xs tracking-[0.2em] uppercase">Oblast působení</p>
                <Text tone="muted" size="sm">
                  Plzeň a okolí — Plzeňský kraj, případně dle dohody.
                </Text>
              </Stack>

              <Stack gap="md">
                <p className="text-faint text-xs tracking-[0.2em] uppercase">Odezva</p>
                <Text tone="muted" size="sm">
                  Na zprávy odpovídám zpravidla do 24 hodin. V případě urgence volejte.
                </Text>
              </Stack>
            </Stack>
          </div>
        </div>
      </Container>
    </Section>
  );
}
