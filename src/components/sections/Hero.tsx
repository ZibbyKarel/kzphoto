import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { Stack } from "@/components/ui/Stack";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-end pt-16 pb-20 md:items-center md:pb-0">
      {/* Pozadí — placeholder foto */}
      <div className="absolute inset-0">
        <Placeholder aspect="auto" className="h-full w-full" label="Titulní fotografie" />
        {/* Gradient overlay pro čitelnost textu */}
        <div className="from-background via-background/60 to-background/20 absolute inset-0 bg-gradient-to-t" />
      </div>

      {/* Obsah */}
      <Container className="relative z-10">
        <Stack gap="lg" className="max-w-3xl py-20 md:py-28">
          <Eyebrow>Fotograf — Plzeň a okolí</Eyebrow>
          <Heading as="h1" size="display">
            Zachytím vaše skutečné okamžiky
          </Heading>
          <Text size="lg" tone="muted" className="max-w-xl">
            Rodinné focení, reality a krajiny. Přirozené světlo, autentické momenty — bez přehnaných
            pózování.
          </Text>
          <div className="flex flex-wrap gap-4 pt-2">
            <ButtonLink href="/#kontakt" size="lg">
              Domluvit focení
            </ButtonLink>
            <ButtonLink href="/#galerie" variant="ghost" size="lg">
              Prohlédnout galerii
            </ButtonLink>
          </div>
        </Stack>
      </Container>
    </section>
  );
}
