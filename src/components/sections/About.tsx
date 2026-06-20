import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";

export function About() {
  return (
    <Section id="o-mne" className="border-border scroll-mt-24 border-t">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Portrét */}
          <div className="order-2 md:order-1">
            <Placeholder
              aspect="4/5"
              label="Portrét fotografa"
              className="w-full max-w-sm md:max-w-none"
            />
          </div>

          {/* Text */}
          <div className="order-1 flex items-center md:order-2">
            <Stack gap="lg" className="w-full">
              <Stack gap="sm">
                <Eyebrow>O mně</Eyebrow>
                <Heading as="h2" size="xl">
                  Fotografuji to, co se nedá zopakovat
                </Heading>
              </Stack>

              <Stack gap="md">
                <Text tone="muted">
                  Jsem fotograf z Plzně na začátku své cesty — a beru to jako přednost. Svoje jméno
                  si teprve buduji, takže do každého focení dávám naprostou pozornost a energii.
                  Nejste pro mě zakázka v řadě, ale lidé, jejichž okamžik chci zachytit co nejlíp.
                </Text>
                <Text tone="muted">
                  Nejvíc mě naplňuje rodinné focení — spontánní smích, objetí, pohled, na který se
                  nedá připravit. Fotím venku i v interiéru, ale přirozené světlo je moje doména.
                  Pracuji klidně, bez spěchu, ať se před objektivem cítí každý pohodlně. Vedle
                  rodiny se věnuji i svatebním reportážím, událostem a leteckým záběrům z dronu.
                </Text>
              </Stack>

              <ButtonLink href="/#galerie" variant="ghost">
                Prohlédnout práci
              </ButtonLink>
            </Stack>
          </div>
        </div>
      </Container>
    </Section>
  );
}
