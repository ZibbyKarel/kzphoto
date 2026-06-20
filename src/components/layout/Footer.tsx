import { Container } from "@/components/ui/Container";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { Logo } from "@/components/ui/Logo";
import { Label, Text, Title } from "@/components/ui/Typography";
import { TextLink } from "@/components/ui/Link";
import { site } from "@/lib/site";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const tc = useTranslations("common");
  const year = 2026;

  return (
    <footer className="border-border mt-auto border-t">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo className="h-14 w-14" />
          <Title as="p" className="mt-4">
            {site.name}
          </Title>
          <Text tone="muted" size="sm" className="mt-3">
            {tc("tagline")}
          </Text>
        </div>

        <nav className="flex flex-col gap-3">
          <Label>{tf("navLabel")}</Label>
          {site.nav.map((item) => (
            <TextLink key={item.href} href={item.href} className="text-sm">
              {t(item.id)}
            </TextLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <Label>{tf("contactLabel")}</Label>
          <ContactLinks tone="nav" className="text-sm" />
        </div>
      </Container>

      <Container className="border-border flex flex-col gap-2 border-t py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="text-faint">
          © {year} {site.name}. {tf("rights")}
        </p>
      </Container>
    </footer>
  );
}
