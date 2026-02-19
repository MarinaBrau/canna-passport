"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTransition, useState } from "react";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  function switchLocale() {
    const next = locale === "pt" ? "en" : "pt";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <>
      <style>{`
        .cp-nav-link {
          position: relative;
          color: rgba(180, 218, 196, 0.65);
          text-decoration: none;
          padding-bottom: 2px;
          transition: color 0.2s;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .cp-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #00d97a, #00a85e);
          transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cp-nav-link:hover {
          color: rgba(223, 240, 232, 0.95);
        }
        .cp-nav-link:hover::after {
          width: 100%;
        }
        .cp-lang-btn {
          min-height: 44px;
          min-width: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .cp-lang-btn:hover:not(:disabled) {
          background: rgba(0, 217, 122, 0.16) !important;
          border-color: rgba(0, 217, 122, 0.38) !important;
          color: #00ff8e !important;
          transform: scale(1.04);
        }
        .cp-hamburger-line {
          display: block;
          width: 20px;
          height: 1.5px;
          background: rgba(223, 240, 232, 0.75);
          transition: transform 0.25s ease, opacity 0.2s;
          transform-origin: center;
        }
        .cp-hamburger-open .cp-hamburger-line:nth-child(1) {
          transform: translateY(5.5px) rotate(45deg);
        }
        .cp-hamburger-open .cp-hamburger-line:nth-child(2) {
          opacity: 0;
        }
        .cp-hamburger-open .cp-hamburger-line:nth-child(3) {
          transform: translateY(-5.5px) rotate(-45deg);
        }
        .cp-mobile-menu {
          animation: cp-slide-down 0.22s ease forwards;
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(4, 9, 10, 0.88)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          borderBottom: "1px solid rgba(0, 217, 122, 0.1)",
          boxShadow: "0 1px 40px rgba(0, 0, 0, 0.6)",
        }}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 select-none min-h-[44px]"
            aria-label="Canna Passport — página inicial"
          >
            <span
              className="text-xl leading-none"
              style={{ filter: "drop-shadow(0 0 12px rgba(0, 217, 122, 0.7))" }}
            >
              🌿
            </span>
            <span className="font-semibold tracking-tight" style={{ color: "rgba(223,240,232,0.85)", fontSize: "17px" }}>
              Canna{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d97a 0%, #00a85e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800,
                }}
              >
                Passport
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-8 text-base">
            <Link href="/countries" className="cp-nav-link">
              {t("countries")}
            </Link>
            <Link href="/glossary" className="cp-nav-link">
              {t("glossary")}
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Age stamp — desktop only */}
            <div
              className="hidden sm:flex w-9 h-9 items-center justify-center select-none"
              aria-hidden="true"
              style={{
                border: "1.5px dashed rgba(0, 217, 122, 0.38)",
                borderRadius: "50%",
                background: "rgba(0, 217, 122, 0.04)",
                transform: "rotate(-12deg)",
              }}
            >
              <span
                className="text-[9px] font-black tracking-tight leading-none"
                style={{ color: "rgba(0, 217, 122, 0.88)" }}
              >
                19+
              </span>
            </div>

            {/* Language pill */}
            <button
              onClick={switchLocale}
              disabled={isPending}
              className="cp-lang-btn text-[11px] font-bold px-4 py-1.5 rounded-full disabled:opacity-40"
              style={{
                background: "rgba(0, 217, 122, 0.07)",
                border: "1px solid rgba(0, 217, 122, 0.18)",
                color: "#00d97a",
                letterSpacing: "0.08em",
              }}
              aria-label={locale === "pt" ? "Switch to English" : "Mudar para Português"}
            >
              {locale === "pt" ? "EN" : "PT"}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`sm:hidden flex flex-col justify-center items-center gap-[4px] w-11 h-11 rounded-lg transition-colors ${mobileOpen ? "cp-hamburger-open" : ""}`}
              style={{
                background: mobileOpen ? "rgba(0,217,122,0.07)" : "transparent",
              }}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span className="cp-hamburger-line" />
              <span className="cp-hamburger-line" />
              <span className="cp-hamburger-line" />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="cp-mobile-menu sm:hidden"
            style={{
              borderTop: "1px solid rgba(0, 217, 122, 0.08)",
              background: "rgba(4, 9, 10, 0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              <Link
                href="/countries"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium transition-colors"
                style={{ color: "rgba(180, 218, 196, 0.75)" }}
              >
                <span style={{ color: "#00d97a" }}>✈️</span>
                {t("countries")}
              </Link>
              <Link
                href="/glossary"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-base font-medium transition-colors"
                style={{ color: "rgba(180, 218, 196, 0.75)" }}
              >
                <span>📖</span>
                {t("glossary")}
              </Link>
              <div
                className="mt-2 pt-3 text-xs"
                style={{
                  borderTop: "1px solid rgba(0,217,122,0.08)",
                  color: "rgba(160,200,176,0.40)",
                }}
              >
                Apenas para maiores de 19 anos
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
