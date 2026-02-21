import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";
  return {
    title: isPt ? "Termos de Uso" : "Terms of Use",
    description: isPt
      ? "Termos e condições de uso do Canna Passport."
      : "Terms and conditions of use for Canna Passport.",
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isPt = locale === "pt";

  return (
    <main className="min-h-screen" style={{ background: "var(--cp-bg, #04090a)" }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-sm mb-8 inline-block transition-colors"
          style={{ color: "rgba(0,217,122,0.7)" }}
        >
          ← Canna Passport
        </Link>

        <div className="prose prose-invert max-w-none" style={{ color: "rgba(180,218,196,0.85)" }}>
          {isPt ? <ContentPt /> : <ContentEn />}
        </div>
      </div>
    </main>
  );
}

function ContentPt() {
  return (
    <>
      <h1 style={{ color: "#dff0e8" }}>Termos de Uso</h1>
      <p style={{ color: "rgba(160,200,176,0.5)" }}>
        Última atualização: 21 de fevereiro de 2026
      </p>

      <h2>1. Aceitação dos termos</h2>
      <p>
        Ao acessar o <strong>Canna Passport</strong> (<a href="https://www.canna-passport.com" style={{ color: "#00d97a" }}>www.canna-passport.com</a>),
        você concorda com estes Termos de Uso. Se não concordar com alguma condição, por favor,
        não utilize o site.
      </p>

      <h2>2. Natureza do conteúdo</h2>
      <p>
        O Canna Passport é um <strong>guia informativo</strong>. Todo o conteúdo publicado
        tem finalidade exclusivamente educacional e turística. O site <strong>não incentiva,
        promove nem facilita</strong> o consumo de substâncias controladas.
      </p>

      <h2>3. Restrição de idade</h2>
      <p>
        O conteúdo deste site é destinado exclusivamente a <strong>maiores de 18 anos</strong>.
        Ao utilizar o site, você declara ter 18 anos ou mais.
      </p>

      <h2>4. Precisão das informações</h2>
      <p>
        As leis sobre cannabis variam entre países, estados e municípios, e mudam com
        frequência. Embora nos esforcemos para manter o conteúdo atualizado,
        <strong> não garantimos a precisão, completude ou atualidade</strong> das informações.
      </p>
      <p>
        <strong>Sempre verifique as leis locais vigentes antes de viajar.</strong> O Canna
        Passport não se responsabiliza por decisões tomadas com base nas informações do site.
      </p>

      <h2>5. Isenção de responsabilidade</h2>
      <p>O Canna Passport não se responsabiliza por:</p>
      <ul>
        <li>Consequências legais decorrentes do uso das informações publicadas</li>
        <li>Mudanças nas leis locais após a publicação do conteúdo</li>
        <li>Serviços de terceiros acessados por meio dos links do site</li>
        <li>Qualquer dano direto ou indireto resultante do uso do site</li>
      </ul>

      <h2>6. Links de terceiros e afiliados</h2>
      <p>
        O site contém links para serviços de terceiros, incluindo plataformas de reserva
        de tours (GetYourGuide, Civitatis, entre outros). Esses links podem ser links
        de afiliados, pelos quais podemos receber comissão em caso de reserva, sem
        custo adicional para você.
      </p>
      <p>
        Não nos responsabilizamos pelo conteúdo, preços, disponibilidade ou políticas dos
        serviços de terceiros.
      </p>

      <h2>7. Propriedade intelectual</h2>
      <p>
        Todo o conteúdo original do site — textos, design, logotipos e código —
        é propriedade do Canna Passport. É proibida a reprodução sem autorização prévia.
        Dados factuais sobre leis de cannabis são de domínio público.
      </p>

      <h2>8. Modificações</h2>
      <p>
        Reservamo-nos o direito de alterar estes Termos a qualquer momento. A data da
        última atualização está indicada no topo desta página. O uso continuado do site
        após alterações implica aceite dos novos termos.
      </p>

      <h2>9. Lei aplicável</h2>
      <p>
        Estes Termos são regidos pelas leis brasileiras. Para questões legais, fica
        eleito o foro da Comarca de São Paulo/SP.
      </p>

      <h2>10. Contato</h2>
      <p>
        Dúvidas sobre estes Termos:{" "}
        <a href="mailto:contato@canna-passport.com" style={{ color: "#00d97a" }}>
          contato@canna-passport.com
        </a>
      </p>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <h1 style={{ color: "#dff0e8" }}>Terms of Use</h1>
      <p style={{ color: "rgba(160,200,176,0.5)" }}>
        Last updated: February 21, 2026
      </p>

      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing <strong>Canna Passport</strong> (<a href="https://www.canna-passport.com" style={{ color: "#00d97a" }}>www.canna-passport.com</a>),
        you agree to these Terms of Use. If you disagree with any condition, please do not
        use the site.
      </p>

      <h2>2. Nature of content</h2>
      <p>
        Canna Passport is an <strong>informational guide</strong>. All published content
        is for educational and tourism purposes only. The site does <strong>not encourage,
        promote, or facilitate</strong> the consumption of controlled substances.
      </p>

      <h2>3. Age restriction</h2>
      <p>
        This site's content is intended exclusively for individuals <strong>18 years of age or
        older</strong>. By using the site, you confirm that you are 18 or older.
      </p>

      <h2>4. Accuracy of information</h2>
      <p>
        Cannabis laws vary between countries, states, and municipalities and change frequently.
        While we strive to keep content up to date, we <strong>do not guarantee the accuracy,
        completeness, or currency</strong> of the information provided.
      </p>
      <p>
        <strong>Always verify current local laws before traveling.</strong> Canna Passport
        is not responsible for decisions made based on information published on the site.
      </p>

      <h2>5. Disclaimer of liability</h2>
      <p>Canna Passport is not responsible for:</p>
      <ul>
        <li>Legal consequences arising from use of the published information</li>
        <li>Changes in local laws after content publication</li>
        <li>Third-party services accessed through links on the site</li>
        <li>Any direct or indirect damages resulting from use of the site</li>
      </ul>

      <h2>6. Third-party and affiliate links</h2>
      <p>
        The site contains links to third-party services, including tour booking platforms
        (GetYourGuide, Civitatis, and others). These may be affiliate links through which
        we may earn a commission on bookings, at no extra cost to you.
      </p>
      <p>
        We are not responsible for the content, pricing, availability, or policies of
        third-party services.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All original content on the site — text, design, logos, and code — is the property
        of Canna Passport. Reproduction without prior authorization is prohibited. Factual
        data about cannabis laws is in the public domain.
      </p>

      <h2>8. Modifications</h2>
      <p>
        We reserve the right to modify these Terms at any time. The date of the last update
        is shown at the top of this page. Continued use of the site after changes constitutes
        acceptance of the new terms.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by Brazilian law. For legal matters, the courts of
        São Paulo, Brazil shall have jurisdiction.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href="mailto:contato@canna-passport.com" style={{ color: "#00d97a" }}>
          contato@canna-passport.com
        </a>
      </p>
    </>
  );
}
