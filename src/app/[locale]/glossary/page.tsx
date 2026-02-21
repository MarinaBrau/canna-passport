import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Static params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  const title = isPt
    ? "Glossário Cannabis PT-EN | Canna Passport"
    : "Cannabis Glossary PT-EN | Canna Passport";
  const description = isPt
    ? "Glossário bilíngue (português-inglês) dos termos mais usados no turismo de cannabis: THC, CBD, dispensário, coffeeshop, descriminalizado e muito mais."
    : "Bilingual (Portuguese-English) glossary of the most common cannabis tourism terms: THC, CBD, dispensary, coffeeshop, decriminalized, and more.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: `/${locale}/glossary`,
      languages: { pt: "/pt/glossary", en: "/en/glossary" },
    },
  };
}

// ─── Glossary data ───────────────────────────────────────────────────────────

interface Term {
  pt: string;
  en: string;
  def: { pt: string; en: string };
  tag?: string; // optional label: "legal" | "produto" | "gíria"
}

const TERMS: Term[] = [
  // A
  {
    pt: "Acessórios",
    en: "Accessories",
    def: {
      pt: "Equipamentos usados para consumo de cannabis: grinder, vaporizador, piteiras, papéis, etc.",
      en: "Equipment used for cannabis consumption: grinder, vaporizer, tips, papers, etc.",
    },
    tag: "produto",
  },
  // B
  {
    pt: "Baseado / Cigarro",
    en: "Joint",
    def: {
      pt: "Cigarro artesanal feito com cannabis enrolada em papel. Uma das formas de consumo mais comuns.",
      en: "Hand-rolled cannabis cigarette. One of the most common methods of consumption.",
    },
    tag: "produto",
  },
  {
    pt: "Bong",
    en: "Bong",
    def: {
      pt: "Cachimbo de água usado para filtrar e resfriar a fumaça da cannabis antes de inalar.",
      en: "Water pipe used to filter and cool cannabis smoke before inhaling.",
    },
    tag: "produto",
  },
  // C
  {
    pt: "Cannabis",
    en: "Cannabis",
    def: {
      pt: "Planta da espécie Cannabis sativa L. da qual se extrai THC, CBD e outros canabinoides. Pode ser chamada de maconha, erva, herb, weed ou marijuana.",
      en: "Plant of the Cannabis sativa L. species from which THC, CBD, and other cannabinoids are extracted. Also called herb, weed, or marijuana.",
    },
    tag: "planta",
  },
  {
    pt: "Cânhamo",
    en: "Hemp",
    def: {
      pt: "Variedade de cannabis com menos de 0,3% de THC. Usada para fibras, óleo e produtos de CBD. Legal na maioria dos países.",
      en: "Cannabis variety with less than 0.3% THC. Used for fiber, oil, and CBD products. Legal in most countries.",
    },
    tag: "planta",
  },
  {
    pt: "CBD (Canabidiol)",
    en: "CBD (Cannabidiol)",
    def: {
      pt: "Canabinoide não-psicoativo presente na cannabis. Usado por suas propriedades terapêuticas (ansiedade, dor, inflamação) sem causar o efeito 'high'.",
      en: "Non-psychoactive cannabinoid found in cannabis. Used for its therapeutic properties (anxiety, pain, inflammation) without causing a 'high'.",
    },
    tag: "composto",
  },
  {
    pt: "Club Social de Cannabis",
    en: "Cannabis Social Club",
    def: {
      pt: "Associação privada sem fins lucrativos onde membros cultivam e compartilham cannabis entre si. Modelo legal predominante na Espanha e Bélgica.",
      en: "Private non-profit association where members grow and share cannabis among themselves. The predominant legal model in Spain and Belgium.",
    },
    tag: "legal",
  },
  {
    pt: "Coffeeshop",
    en: "Coffeeshop",
    def: {
      pt: "Estabelecimento licenciado nos Países Baixos onde é permitido comprar e consumir cannabis. Venda limitada a 5g por pessoa por visita.",
      en: "Licensed establishment in the Netherlands where cannabis can be purchased and consumed. Sale limited to 5g per person per visit.",
    },
    tag: "legal",
  },
  {
    pt: "Concentrado",
    en: "Concentrate",
    def: {
      pt: "Produto de cannabis com alta concentração de canabinoides obtido por extração (haxixe, óleo, shatter, wax). Muito mais potente que a flor.",
      en: "High-potency cannabis product obtained through extraction (hashish, oil, shatter, wax). Much more potent than flower.",
    },
    tag: "produto",
  },
  {
    pt: "Consumo em Espaço Público",
    en: "Public Consumption",
    def: {
      pt: "Consumo de cannabis em locais abertos ou públicos. Geralmente proibido mesmo em países onde a cannabis é legal — verifique sempre as regras locais.",
      en: "Cannabis consumption in open or public spaces. Generally prohibited even in countries where cannabis is legal — always check local rules.",
    },
    tag: "legal",
  },
  // D
  {
    pt: "Descriminalizado",
    en: "Decriminalized",
    def: {
      pt: "Status legal em que a posse de pequenas quantidades de cannabis para uso pessoal não resulta em pena criminal, mas pode gerar multa administrativa. Não significa que é legal.",
      en: "Legal status where possession of small amounts of cannabis for personal use does not result in criminal penalty, but may incur an administrative fine. Does not mean it is legal.",
    },
    tag: "legal",
  },
  {
    pt: "Dispensário",
    en: "Dispensary",
    def: {
      pt: "Loja licenciada para venda de cannabis recreativa ou medicinal. Comum nos EUA e Canadá. Exige documento de identidade e em alguns estados, cartão médico.",
      en: "Licensed store for the sale of recreational or medicinal cannabis. Common in the USA and Canada. Requires ID and, in some states, a medical card.",
    },
    tag: "legal",
  },
  // E
  {
    pt: "Edível",
    en: "Edible",
    def: {
      pt: "Alimento ou bebida infundido com cannabis (brownie, gummy, chocolate, etc.). O efeito demora 30–120 minutos para aparecer e é mais intenso e longo do que fumar.",
      en: "Food or drink infused with cannabis (brownie, gummy, chocolate, etc.). Effects take 30–120 minutes to appear and are more intense and longer-lasting than smoking.",
    },
    tag: "produto",
  },
  {
    pt: "Entourage Effect",
    en: "Entourage Effect",
    def: {
      pt: "Teoria de que canabinoides, terpenos e outros compostos da cannabis agem de forma sinérgica, potencializando mutuamente seus efeitos.",
      en: "Theory that cannabinoids, terpenes, and other cannabis compounds act synergistically, mutually enhancing their effects.",
    },
    tag: "composto",
  },
  // F
  {
    pt: "Flor / Erva",
    en: "Flower / Herb",
    def: {
      pt: "Parte da planta de cannabis fêmea colhida e seca para consumo. Também chamada de 'bud', 'erva', 'maconha' ou 'weed'. É a forma de consumo mais difundida.",
      en: "Harvested and dried part of the female cannabis plant for consumption. Also called 'bud', 'weed', or 'herb'. The most widespread form of consumption.",
    },
    tag: "produto",
  },
  // G
  {
    pt: "Grinder",
    en: "Grinder",
    def: {
      pt: "Triturador manual ou elétrico usado para moer a flor de cannabis antes do consumo, garantindo queima uniforme.",
      en: "Manual or electric grinder used to break down cannabis flower before consumption, ensuring even burn.",
    },
    tag: "produto",
  },
  // H
  {
    pt: "Haxixe",
    en: "Hashish / Hash",
    def: {
      pt: "Produto concentrado feito da resina (tricomas) da planta de cannabis. Formato tradicional de consumo em países do Oriente Médio, Marrocos e Índia.",
      en: "Concentrated product made from the resin (trichomes) of the cannabis plant. Traditional form of consumption in Middle Eastern countries, Morocco, and India.",
    },
    tag: "produto",
  },
  {
    pt: "Híbrido",
    en: "Hybrid",
    def: {
      pt: "Variedade de cannabis que mistura genética Indica e Sativa. A maioria das cepas modernas são híbridas, com perfis de efeitos variados.",
      en: "Cannabis variety that mixes Indica and Sativa genetics. Most modern strains are hybrids, with varied effect profiles.",
    },
    tag: "planta",
  },
  // I
  {
    pt: "Indica",
    en: "Indica",
    def: {
      pt: "Subespécie de cannabis classicamente associada a efeitos relaxantes e sedativos ('body high'). Plantas mais baixas e compactas.",
      en: "Cannabis subspecies classically associated with relaxing and sedative effects ('body high'). Shorter and more compact plants.",
    },
    tag: "planta",
  },
  // L
  {
    pt: "Legal Recreativo",
    en: "Recreational Legal",
    def: {
      pt: "Status em que adultos podem comprar, possuir e consumir cannabis sem necessidade de prescrição médica. Exemplos: Canadá, Alemanha, Holanda, alguns estados dos EUA.",
      en: "Status where adults can purchase, possess, and consume cannabis without a medical prescription. Examples: Canada, Germany, Netherlands, some US states.",
    },
    tag: "legal",
  },
  {
    pt: "Limite de Posse",
    en: "Possession Limit",
    def: {
      pt: "Quantidade máxima de cannabis que um indivíduo pode carregar legalmente em público. Varia por país: 30g (Canadá), 5g (Holanda, por compra), 7g (Alemanha), etc.",
      en: "Maximum amount of cannabis an individual can legally carry in public. Varies by country: 30g (Canada), 5g (Netherlands, per purchase), 7g (Germany), etc.",
    },
    tag: "legal",
  },
  // M
  {
    pt: "Medicinal",
    en: "Medicinal",
    def: {
      pt: "Uso de cannabis prescrito por médico para tratamento de condições de saúde. Requer cartão ou receita médica. Regulamentado de forma diferente do uso recreativo.",
      en: "Cannabis use prescribed by a doctor to treat health conditions. Requires a medical card or prescription. Regulated differently from recreational use.",
    },
    tag: "legal",
  },
  {
    pt: "Microdosagem",
    en: "Microdosing",
    def: {
      pt: "Prática de consumir quantidades muito pequenas de cannabis para obter benefícios sutis (foco, relaxamento) sem efeitos psicoativos intensos.",
      en: "Practice of consuming very small amounts of cannabis to obtain subtle benefits (focus, relaxation) without intense psychoactive effects.",
    },
  },
  // P
  {
    pt: "Posse Pessoal",
    en: "Personal Possession",
    def: {
      pt: "Quantidade de cannabis que uma pessoa pode ter para uso próprio, dentro do limite legal do país. Normalmente não pode ser compartilhada ou vendida.",
      en: "Amount of cannabis a person can have for personal use, within the country's legal limit. Generally cannot be shared or sold.",
    },
    tag: "legal",
  },
  // S
  {
    pt: "Sativa",
    en: "Sativa",
    def: {
      pt: "Subespécie de cannabis classicamente associada a efeitos energizantes e cerebrais ('head high'). Plantas mais altas com folhas finas.",
      en: "Cannabis subspecies classically associated with energizing and cerebral effects ('head high'). Taller plants with thin leaves.",
    },
    tag: "planta",
  },
  // T
  {
    pt: "Terpenos",
    en: "Terpenes",
    def: {
      pt: "Compostos aromáticos presentes na cannabis (e em outras plantas) que determinam o cheiro e influenciam os efeitos. Exemplos: limoneno, mirceno, linalol.",
      en: "Aromatic compounds found in cannabis (and other plants) that determine scent and influence effects. Examples: limonene, myrcene, linalool.",
    },
    tag: "composto",
  },
  {
    pt: "THC (Tetrahidrocanabinol)",
    en: "THC (Tetrahydrocannabinol)",
    def: {
      pt: "Principal canabinoide psicoativo da cannabis, responsável pelo efeito 'high'. A concentração de THC varia entre 5% e 30%+ dependendo da cepa e do produto.",
      en: "Main psychoactive cannabinoid in cannabis, responsible for the 'high' effect. THC concentration ranges from 5% to 30%+ depending on the strain and product.",
    },
    tag: "composto",
  },
  {
    pt: "Tintura",
    en: "Tincture",
    def: {
      pt: "Extrato líquido de cannabis diluído em álcool ou óleo, administrado sob a língua. Inicio dos efeitos em 15–45 minutos. Popular no uso medicinal.",
      en: "Liquid cannabis extract diluted in alcohol or oil, administered under the tongue. Effects begin in 15–45 minutes. Popular for medicinal use.",
    },
    tag: "produto",
  },
  {
    pt: "Turista pode comprar?",
    en: "Can tourists buy?",
    def: {
      pt: "Questão-chave em cada destino. Na Holanda, EUA e Canadá: sim. Na Alemanha: somente residentes. No Uruguai: apenas residentes cadastrados em farmácias.",
      en: "Key question in each destination. In the Netherlands, USA, and Canada: yes. In Germany: residents only. In Uruguay: only registered residents at pharmacies.",
    },
    tag: "legal",
  },
  // V
  {
    pt: "Vaporizador",
    en: "Vaporizer / Vape",
    def: {
      pt: "Dispositivo que aquece a cannabis abaixo do ponto de combustão, liberando vapor em vez de fumaça. Considerado menos prejudicial aos pulmões do que fumar.",
      en: "Device that heats cannabis below the combustion point, releasing vapor instead of smoke. Considered less harmful to the lungs than smoking.",
    },
    tag: "produto",
  },
];

const TAG_LABELS: Record<string, { pt: string; en: string; color: string }> = {
  legal:   { pt: "Legal",    en: "Legal",    color: "#60a5fa" },
  produto: { pt: "Produto",  en: "Product",  color: "#00d97a" },
  planta:  { pt: "Planta",   en: "Plant",    color: "#34d399" },
  composto:{ pt: "Composto", en: "Compound", color: "#a78bfa" },
};

// Group terms by first letter
function groupByLetter(terms: Term[]) {
  const map = new Map<string, Term[]>();
  for (const term of terms) {
    const letter = term.pt[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(term);
  }
  return map;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isPt = locale === "pt";

  const grouped = groupByLetter(TERMS);
  const letters = [...grouped.keys()].sort();

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen"
        style={{ background: "var(--cp-bg, #04090a)", paddingTop: "80px" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

          {/* Page header */}
          <div style={{ marginBottom: "48px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,217,122,0.7)",
                marginBottom: "8px",
              }}
            >
              Canna Passport
            </p>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "#dff0e8",
                lineHeight: 1.2,
                marginBottom: "12px",
              }}
            >
              {isPt ? "Glossário PT-EN" : "Glossary PT-EN"}
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(160,200,176,0.65)", marginBottom: "24px" }}>
              {isPt
                ? "Termos essenciais do turismo de cannabis em português e inglês."
                : "Essential cannabis tourism terms in Portuguese and English."}
            </p>

            {/* Alphabet jump nav */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letra-${letter}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 700,
                    background: "rgba(0,217,122,0.07)",
                    border: "1px solid rgba(0,217,122,0.15)",
                    color: "rgba(0,217,122,0.8)",
                    textDecoration: "none",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Terms by letter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {letters.map((letter) => (
              <section key={letter} id={`letra-${letter}`}>
                {/* Letter header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "28px",
                      fontWeight: 900,
                      color: "#00d97a",
                      lineHeight: 1,
                      fontFamily: "var(--font-display, serif)",
                    }}
                  >
                    {letter}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "rgba(0,217,122,0.12)",
                    }}
                  />
                </div>

                {/* Terms */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {grouped.get(letter)!.map((term) => {
                    const tag = term.tag ? TAG_LABELS[term.tag] : null;
                    return (
                      <div
                        key={term.en}
                        style={{
                          background: "rgba(8,18,10,0.85)",
                          border: "1px solid rgba(0,217,122,0.08)",
                          borderRadius: "14px",
                          padding: "18px 20px",
                        }}
                      >
                        {/* Term names row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 700,
                              color: "#dff0e8",
                            }}
                          >
                            {isPt ? term.pt : term.en}
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              color: "rgba(160,200,176,0.45)",
                              fontStyle: "italic",
                            }}
                          >
                            {isPt ? `(EN: ${term.en})` : `(PT: ${term.pt})`}
                          </span>
                          {tag && (
                            <span
                              style={{
                                fontSize: "9px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                background: `${tag.color}18`,
                                border: `1px solid ${tag.color}35`,
                                color: tag.color,
                                borderRadius: "999px",
                                padding: "2px 8px",
                              }}
                            >
                              {isPt ? tag.pt : tag.en}
                            </span>
                          )}
                        </div>

                        {/* Definition */}
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            color: "rgba(160,200,176,0.70)",
                            lineHeight: "1.6",
                          }}
                        >
                          {isPt ? term.def.pt : term.def.en}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <p
            style={{
              marginTop: "56px",
              fontSize: "12px",
              color: "rgba(160,200,176,0.30)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {isPt
              ? "As leis mudam. Verifique sempre as regulamentações locais antes de viajar."
              : "Laws change. Always verify local regulations before traveling."}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
