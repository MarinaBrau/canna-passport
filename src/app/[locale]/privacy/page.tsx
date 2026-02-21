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
    title: isPt ? "Política de Privacidade" : "Privacy Policy",
    description: isPt
      ? "Como o Canna Passport coleta, usa e protege seus dados pessoais."
      : "How Canna Passport collects, uses and protects your personal data.",
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
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
      <h1 style={{ color: "#dff0e8" }}>Política de Privacidade</h1>
      <p style={{ color: "rgba(160,200,176,0.5)" }}>
        Última atualização: 21 de fevereiro de 2026
      </p>

      <h2>1. Quem somos</h2>
      <p>
        O <strong>Canna Passport</strong> (<a href="https://www.canna-passport.com" style={{ color: "#00d97a" }}>www.canna-passport.com</a>) é um guia
        digital informativo sobre turismo de cannabis legal no mundo. Não vendemos produtos
        nem prestamos serviços pagos diretamente.
      </p>

      <h2>2. Dados que coletamos</h2>

      <h3>2.1 Google Analytics 4 (somente com seu consentimento)</h3>
      <p>
        Quando você aceita nossos cookies, utilizamos o Google Analytics 4 para coletar
        dados anônimos de uso, incluindo:
      </p>
      <ul>
        <li>Páginas visitadas e tempo de permanência</li>
        <li>País e idioma do navegador</li>
        <li>Tipo de dispositivo e sistema operacional</li>
        <li>Origem do acesso (busca orgânica, direto, redes sociais)</li>
      </ul>
      <p>
        O endereço IP é anonimizado e <strong>nenhum dado pessoal identificável</strong> é
        coletado pelo Google Analytics. Se você recusar os cookies, o Google Analytics
        não é carregado.
      </p>

      <h3>2.2 Lista de espera (e-mail)</h3>
      <p>
        O formulário de e-mail na página inicial é uma lista de espera para novidades. No momento,
        os e-mails inseridos são exibidos como confirmação na tela mas <strong>não são armazenados</strong> em
        nenhum servidor. Quando essa funcionalidade for ativada, esta política será atualizada.
      </p>

      <h2>3. Finalidade do tratamento</h2>
      <ul>
        <li>Entender como o site é utilizado para melhorar o conteúdo</li>
        <li>Analisar quais destinos e guias são mais acessados</li>
        <li>Melhorar a experiência de navegação</li>
      </ul>

      <h2>4. Base legal (LGPD)</h2>
      <p>
        O tratamento de dados por meio do Google Analytics é fundamentado no seu
        <strong> consentimento</strong> (Art. 7º, inciso I, da Lei nº 13.709/2018 — LGPD).
        Você pode retirar o consentimento a qualquer momento clicando em
        "Recusar cookies" no banner que aparece ao acessar o site pela primeira vez,
        ou limpando os dados do navegador.
      </p>

      <h2>5. Retenção de dados</h2>
      <p>
        Os dados coletados pelo Google Analytics são retidos por <strong>14 meses</strong>,
        conforme a configuração padrão do serviço. Após esse período, são excluídos automaticamente.
      </p>

      <h2>6. Compartilhamento de dados</h2>
      <p>
        Não vendemos nem compartilhamos seus dados com terceiros, exceto com o
        <strong> Google LLC</strong> (operador do Google Analytics), que processa os dados
        conforme sua própria <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#00d97a" }}>Política de Privacidade</a>.
      </p>

      <h2>7. Links de afiliados</h2>
      <p>
        Algumas páginas contêm links de parceiros como GetYourGuide e Civitatis. Ao clicar
        nesses links, você é redirecionado para os sites parceiros, que possuem suas próprias
        políticas de privacidade. O Canna Passport pode receber comissão por reservas realizadas,
        sem custo adicional para você.
      </p>

      <h2>8. Cookies</h2>
      <p>Utilizamos apenas um tipo de cookie:</p>
      <ul>
        <li>
          <strong>Cookie de preferência de consentimento</strong> (<code>cp_cookie_consent</code>):
          armazenado localmente no seu navegador para lembrar sua escolha sobre cookies analíticos.
          Não é enviado a nenhum servidor.
        </li>
        <li>
          <strong>Cookies do Google Analytics</strong> (<code>_ga</code>, <code>_ga_*</code>):
          coletados somente após seu consentimento.
        </li>
      </ul>

      <h2>9. Seus direitos (LGPD)</h2>
      <p>Você tem direito a:</p>
      <ul>
        <li>Confirmar a existência de tratamento de dados pessoais</li>
        <li>Acessar os dados que temos sobre você</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
        <li>Solicitar a exclusão dos dados tratados com base no consentimento</li>
        <li>Retirar o consentimento a qualquer momento</li>
      </ul>
      <p>
        Para exercer esses direitos, entre em contato pelo e-mail:{" "}
        <a href="mailto:contato@canna-passport.com" style={{ color: "#00d97a" }}>
          contato@canna-passport.com
        </a>
      </p>

      <h2>10. Alterações nesta política</h2>
      <p>
        Esta política pode ser atualizada periodicamente. A data da última revisão está
        indicada no topo desta página. O uso continuado do site após alterações implica
        aceite das novas condições.
      </p>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <h1 style={{ color: "#dff0e8" }}>Privacy Policy</h1>
      <p style={{ color: "rgba(160,200,176,0.5)" }}>
        Last updated: February 21, 2026
      </p>

      <h2>1. Who we are</h2>
      <p>
        <strong>Canna Passport</strong> (<a href="https://www.canna-passport.com" style={{ color: "#00d97a" }}>www.canna-passport.com</a>) is a digital
        informational guide about legal cannabis tourism around the world. We do not sell
        products or provide paid services directly.
      </p>

      <h2>2. Data we collect</h2>

      <h3>2.1 Google Analytics 4 (only with your consent)</h3>
      <p>
        When you accept our cookies, we use Google Analytics 4 to collect anonymous usage
        data, including:
      </p>
      <ul>
        <li>Pages visited and time spent</li>
        <li>Country and browser language</li>
        <li>Device type and operating system</li>
        <li>Traffic source (organic search, direct, social media)</li>
      </ul>
      <p>
        IP addresses are anonymized and <strong>no personally identifiable data</strong> is
        collected via Google Analytics. If you decline cookies, Google Analytics is not loaded.
      </p>

      <h3>2.2 Email waitlist</h3>
      <p>
        The email form on the homepage is a waitlist for updates. At this time, submitted
        emails are displayed as a confirmation on screen but are <strong>not stored</strong> on
        any server. This policy will be updated when that feature is activated.
      </p>

      <h2>3. Purpose of processing</h2>
      <ul>
        <li>Understanding how the site is used to improve content</li>
        <li>Analyzing which destinations and guides are most visited</li>
        <li>Improving the browsing experience</li>
      </ul>

      <h2>4. Legal basis</h2>
      <p>
        Data processing via Google Analytics is based on your <strong>consent</strong>
        (GDPR Art. 6(1)(a) for EU/EEA users; LGPD Art. 7(I) for Brazilian users).
        You may withdraw consent at any time by clicking "Decline" on the cookie banner
        or clearing your browser data.
      </p>

      <h2>5. Data retention</h2>
      <p>
        Data collected by Google Analytics is retained for <strong>14 months</strong> under
        the default service configuration, after which it is automatically deleted.
      </p>

      <h2>6. Data sharing</h2>
      <p>
        We do not sell or share your data with third parties, except with <strong>Google LLC</strong> (Google
        Analytics processor), which processes data under its own{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#00d97a" }}>Privacy Policy</a>.
      </p>

      <h2>7. Affiliate links</h2>
      <p>
        Some pages contain affiliate links to partners such as GetYourGuide and Civitatis.
        When you click these links, you are redirected to partner sites with their own privacy
        policies. Canna Passport may earn a commission on bookings made, at no extra cost to you.
      </p>

      <h2>8. Cookies</h2>
      <ul>
        <li>
          <strong>Consent preference cookie</strong> (<code>cp_cookie_consent</code>):
          stored locally in your browser to remember your choice. Never sent to any server.
        </li>
        <li>
          <strong>Google Analytics cookies</strong> (<code>_ga</code>, <code>_ga_*</code>):
          only set after your consent.
        </li>
      </ul>

      <h2>9. Your rights</h2>
      <p>Under GDPR and LGPD, you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of data processed under consent</li>
        <li>Withdraw consent at any time</li>
        <li>Lodge a complaint with a supervisory authority</li>
      </ul>
      <p>
        To exercise these rights, contact us at:{" "}
        <a href="mailto:contato@canna-passport.com" style={{ color: "#00d97a" }}>
          contato@canna-passport.com
        </a>
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        This policy may be updated periodically. The last revision date is shown at the top
        of this page. Continued use of the site after changes constitutes acceptance of the
        updated policy.
      </p>
    </>
  );
}
