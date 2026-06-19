import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const inputClass =
  "w-full rounded-none border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-faint focus:border-accent-strong focus:outline-none transition-colors duration-200";

const labelClass = "block text-sm font-medium text-muted mb-2";

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

              {/* Formulář — bez onSubmit logiky (přijde ve Fázi 5) */}
              <form className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Jméno a příjmení
                      <span className="text-accent ml-1" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Jan Novák"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>
                      Telefon
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+420 000 000 000"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    E-mail
                    <span className="text-accent ml-1" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="jan@example.cz"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-type" className={labelClass}>
                    Typ focení
                  </label>
                  <select id="contact-type" name="type" defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Vyberte typ...
                    </option>
                    <option value="rodina">Rodinné focení</option>
                    <option value="reality">Reality</option>
                    <option value="krajiny">Krajiny</option>
                    <option value="jine">Jiné</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Zpráva
                    <span className="text-accent ml-1" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Napište mi, co máte v plánu, kdy a kde by se mohlo fotit..."
                    className={inputClass}
                  />
                </div>

                {/* GDPR */}
                <div className="flex items-start gap-3">
                  <input
                    id="contact-gdpr"
                    name="gdpr"
                    type="checkbox"
                    required
                    className="accent-accent mt-1 h-4 w-4 shrink-0"
                  />
                  <label htmlFor="contact-gdpr" className="text-muted text-xs leading-relaxed">
                    Souhlasím se zpracováním osobních údajů za účelem odpovědi na moji zprávu. Údaje
                    nebudou předány třetím stranám.
                  </label>
                </div>

                <Button type="submit" size="lg" className="self-start">
                  Odeslat zprávu
                </Button>
              </form>
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
