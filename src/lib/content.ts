/**
 * Statický obsah webu — ceník, kroky procesu, FAQ, reference.
 * Edituj zde; komponenty odtud čtou data.
 */

/* ---------------------------------------------------------------------------
   Process — Jak to funguje
--------------------------------------------------------------------------- */
export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Napište mi",
    description:
      "Domluvíme se na termínu, místě a vašich představách. Rád zodpovím všechny otázky — stačí napsat nebo zavolat.",
  },
  {
    number: "02",
    title: "Focení",
    description:
      "Přijdu s lehkým vybavením a vy se soustředíte jen na sebe. Vedu focení přirozeně — žádné nucené pózy.",
  },
  {
    number: "03",
    title: "Hotové fotky",
    description:
      "Fotky zpracuji a doručím přes online galerii. Ke stažení ve vysokém rozlišení, kdykoli a odkudkoli.",
  },
] as const;

/* ---------------------------------------------------------------------------
   Pricing — Ceník
--------------------------------------------------------------------------- */
export type PricingPackage = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export const pricingPackages: PricingPackage[] = [
  {
    id: "rodinne",
    title: "Rodinné focení",
    price: "od 1 800 Kč",
    description: "Pro rodiny, páry i jednotlivce — venku i v interiéru.",
    features: ["1–1,5 hodiny focení", "Online galerie ke stažení", "25+ upravených fotek"],
    highlight: true,
  },
  {
    id: "reality-byt",
    title: "Reality — byt do 80 m²",
    price: "od 1 500 Kč",
    description: "Profesionální fotky nemovitosti pro inzerci nebo pronájem.",
    features: ["20–30 fotek", "Dodání do 48 hodin", "Základní retušování"],
  },
  {
    id: "reality-dum",
    title: "Reality — dům / větší",
    price: "od 2 500 Kč",
    description: "Větší nemovitosti a pozemky, možnost záběrů z dronu.",
    features: ["30+ fotek", "Dodání do 48 hodin", "+ možnost dronu (příplatek)"],
  },
] as const;

export const pricingNote =
  "Ceny pro první klienty — průběžně se upravují. Nestandardní požadavky rád probereme individuálně.";

/* ---------------------------------------------------------------------------
   Testimonials — Reference
--------------------------------------------------------------------------- */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Martina K.",
    role: "Rodinné focení",
    text: "Focení probíhalo úplně přirozeně a kluci si to dokonce užívali — to by nikdo nečekal. Fotky jsou krásné, plné emocí. Moc děkujeme!",
  },
  {
    id: "t2",
    name: "Tomáš a Lucie",
    role: "Rodinné focení",
    text: "Hledali jsme někoho, kdo nepůsobí jako mašina na focení. Tady jsme to našli. Fotky dorazily rychle a jsou přesně to, co jsme si přáli.",
  },
  {
    id: "t3",
    name: "Jana M.",
    role: "Reality — byt",
    text: "Byt se na fotkách rozzářil. Inzerát jsme měli online do dvou dnů od focení a zájem byl okamžitý. Určitě doporučuji.",
  },
] as const;

/* ---------------------------------------------------------------------------
   FAQ — Nejčastější otázky
--------------------------------------------------------------------------- */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Jak dlouho trvá zpracování fotek?",
    answer:
      "U rodinného focení do 7–10 pracovních dnů. U realitní fotografie do 48 hodin. Pokud potřebujete fotky dříve, domluvte se se mnou předem — urgentní dodání je možné.",
  },
  {
    id: "faq-2",
    question: "Fotíte exteriér i interiér?",
    answer:
      "Fotím obojí. Rodinné focení preferuji venku pro přirozené světlo, ale interiér je také možný. U realit fotím výhradně uvnitř, exteriér domu nebo zahradu jako bonus.",
  },
  {
    id: "faq-3",
    question: "Co si vzít na rodinné focení?",
    answer:
      "Oblečení v tlumených barvách, které vám sluší a cítíte se v něm pohodlně. Vyhněte se křiklavým vzorům a logům. Sladěné — ale ne uniformní — barvy fungují nejlépe. Zbytek nechte na mě.",
  },
  {
    id: "faq-4",
    question: "Jak funguje storno?",
    answer:
      "Focení lze přesunout bez poplatku nejpozději 48 hodin předem. V případě nepříznivého počasí termín vždy domluvíme nový. Storno do 24 hodin předem nebo nedostavení se může být zpoplatněno.",
  },
  {
    id: "faq-5",
    question: "Nabízíte dárkové poukazy?",
    answer:
      "Ano! Focení jako dárek je skvělý nápad — ať už k narozeninám, Vánocům nebo jen tak. Napište mi a připravím poukaz přesně na míru.",
  },
  {
    id: "faq-6",
    question: "Jak probíhá předání fotek?",
    answer:
      "Fotky dostanete přes soukromou online galerii — odkaz přijde e-mailem. Fotky si stáhnete ve vysokém rozlišení, galerie bude aktivní minimálně 3 měsíce.",
  },
] as const;
