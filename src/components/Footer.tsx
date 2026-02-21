import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <>
      <style>{`
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: rgba(160, 200, 176, 0.52);
          text-decoration: none;
          transition: color 0.2s;
          min-height: 44px;
        }
        .footer-link:hover {
          color: rgba(223, 240, 232, 0.9);
        }
        .footer-link .footer-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s;
          display: inline-block;
        }
        .footer-link:hover .footer-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <footer
        className="relative overflow-hidden"
        style={{ background: "#030807" }}
      >
        {/* Top border gradient */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0,217,122,0.45) 25%, rgba(0,217,122,0.45) 75%, transparent 100%)",
          }}
        />

        {/* Ambient top glow */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 pointer-events-none"
          style={{
            transform: "translateX(-50%)",
            width: "600px",
            height: "200px",
            background: "radial-gradient(ellipse, rgba(0, 217, 122, 0.07) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />

        {/* Leaf watermark */}
        <div
          aria-hidden
          className="absolute bottom-0 right-0 pointer-events-none select-none"
          style={{ opacity: 0.025, width: "300px", height: "300px" }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M100 8 C145 8, 188 52, 188 100 C188 148, 145 188, 100 188 C55 175, 12 132, 12 85 C12 38, 55 8, 100 8 Z" fill="#00d97a" />
            <path d="M100 8 C100 8, 78 90, 100 192" stroke="#000" strokeWidth="5" strokeLinecap="round" />
            <path d="M100 55 C125 48, 162 60, 178 82" stroke="#000" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
            <path d="M100 88 C125 81, 160 90, 175 112" stroke="#000" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
            <path d="M100 120 C120 115, 150 126, 163 146" stroke="#000" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="text-xl"
                  style={{ filter: "drop-shadow(0 0 10px rgba(0,217,122,0.6))" }}
                >
                  🌿
                </span>
                <span className="font-semibold" style={{ color: "rgba(223,240,232,0.80)", fontSize: "15px" }}>
                  Canna{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #00d97a, #008f51)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800,
                    }}
                  >
                    Passport
                  </span>
                </span>
              </div>

              <p
                className="text-sm font-medium mb-3"
                style={{ color: "rgba(160, 200, 176, 0.50)" }}
              >
                {t("tagline")}
              </p>

              <p
                className="text-xs leading-relaxed max-w-sm"
                style={{ color: "rgba(160, 200, 176, 0.28)" }}
              >
                {t("disclaimer")}
              </p>
            </div>

            {/* Links — Guias */}
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.22em] block mb-5"
                style={{ color: "rgba(0, 217, 122, 0.45)" }}
              >
                {t("guides")}
              </span>
              <div className="flex flex-col text-sm">
                <Link href="/countries" className="footer-link">
                  {t("destinations")}
                  <span className="footer-arrow">→</span>
                </Link>
                <Link href="/tours" className="footer-link">
                  {t("tours")}
                  <span className="footer-arrow">→</span>
                </Link>
                <Link href="/hotels" className="footer-link">
                  {t("hotels")}
                  <span className="footer-arrow">→</span>
                </Link>
                <Link href="/glossary" className="footer-link">
                  {tNav("glossary")}
                  <span className="footer-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Links — Legal */}
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.22em] block mb-5"
                style={{ color: "rgba(0, 217, 122, 0.45)" }}
              >
                {t("legal")}
              </span>
              <div className="flex flex-col text-sm">
                <Link href="/privacy" className="footer-link">
                  {t("privacy")}
                  <span className="footer-arrow">→</span>
                </Link>
                <Link href="/terms" className="footer-link">
                  {t("terms")}
                  <span className="footer-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
            style={{ borderTop: "1px solid rgba(0, 217, 122, 0.07)" }}
          >
            <span className="text-xs" style={{ color: "rgba(160, 200, 176, 0.28)" }}>
              © {new Date().getFullYear()} Canna Passport.{" "}
              {t("rights")}
            </span>

            {/* Age stamp */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full select-none"
              style={{
                border: "1.5px dashed rgba(0, 217, 122, 0.28)",
                background: "rgba(0, 217, 122, 0.03)",
              }}
              aria-label="Conteúdo para maiores de 18 anos"
            >
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: "rgba(0, 217, 122, 0.55)" }}
              >
                {t("ageWarning")}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
