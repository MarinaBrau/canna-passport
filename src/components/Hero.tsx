"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("home.hero");
  return (
    <>
      <style>{`
        /* Grid texture */
        .hero-grid {
          background-image:
            linear-gradient(rgba(0, 217, 122, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 122, 0.028) 1px, transparent 1px);
          background-size: 72px 72px;
        }

        /* Glow animations */
        .hero-glow-main {
          animation: cp-glow-breathe 9s ease-in-out infinite;
        }
        .hero-glow-side {
          animation: cp-glow-breathe-side 13s ease-in-out infinite 4s;
        }

        /* Dot blink */
        .hero-dot { animation: cp-dot-blink 2.4s ease-in-out infinite; }

        /* Scroll indicator */
        .hero-scroll { animation: cp-scroll-bob 2.4s ease-in-out infinite; }

        /* Hero content entrance — staggered */
        .hero-el-1 { animation: cp-slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .hero-el-2 { animation: cp-slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
        .hero-el-3 { animation: cp-slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
        .hero-el-4 { animation: cp-slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
        .hero-el-5 { animation: cp-slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.54s both; }

        /* Primary CTA */
        .hero-btn-primary {
          transition: box-shadow 0.25s ease, transform 0.2s ease;
          box-shadow: 0 0 32px rgba(0, 217, 122, 0.38), 0 4px 20px rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
        }
        .hero-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .hero-btn-primary:hover {
          box-shadow: 0 0 52px rgba(0, 217, 122, 0.58), 0 8px 32px rgba(0, 0, 0, 0.5);
          transform: translateY(-2px);
        }
        .hero-btn-primary:hover::after {
          transform: translateX(100%);
        }
        .hero-btn-primary svg {
          transition: transform 0.22s ease;
        }
        .hero-btn-primary:hover svg {
          transform: translateX(4px);
        }

        /* Ghost CTA */
        .hero-btn-ghost {
          transition: background 0.22s, border-color 0.22s, color 0.22s;
        }
        .hero-btn-ghost:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.26) !important;
          color: rgba(223, 240, 232, 0.95) !important;
        }

        /* Email form */
        .hero-email-form {
          transition: box-shadow 0.25s ease;
        }
        .hero-email-form.focused {
          box-shadow: 0 0 0 1px rgba(0, 217, 122, 0.35), 0 0 24px rgba(0, 217, 122, 0.12);
        }

        /* Decorative corner stamp */
        .hero-stamp {
          animation: cp-spin-slow 60s linear infinite;
        }

        /* Email input placeholder */
        #hero-email::placeholder {
          color: rgba(180, 220, 200, 0.52);
        }
      `}</style>

      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16"
        style={{ background: "var(--cp-bg)" }}
      >
        {/* Grid texture */}
        <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none" />

        {/* Noise grain overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Radial vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(4, 9, 10, 0.72) 100%)",
          }}
        />

        {/* Main glow */}
        <div
          aria-hidden
          className="hero-glow-main absolute pointer-events-none"
          style={{
            top: "8%",
            left: "50%",
            width: "780px",
            height: "560px",
            background: "radial-gradient(ellipse, rgba(0, 217, 122, 0.26) 0%, transparent 68%)",
            filter: "blur(60px)",
          }}
        />

        {/* Side accent glow — bottom right */}
        <div
          aria-hidden
          className="hero-glow-side absolute pointer-events-none"
          style={{
            bottom: "18%",
            right: "8%",
            width: "420px",
            height: "420px",
            background: "radial-gradient(ellipse, rgba(0, 217, 122, 0.1) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Decorative rotating stamp — desktop */}
        <div
          aria-hidden
          className="hero-stamp absolute hidden lg:block pointer-events-none select-none"
          style={{
            top: "22%",
            right: "7%",
            width: "120px",
            height: "120px",
            opacity: 0.06,
          }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="54" stroke="#00d97a" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="60" cy="60" r="46" stroke="#00d97a" strokeWidth="0.5" />
            <text
              x="50%"
              y="44%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#00d97a"
              fontSize="22"
              fontWeight="800"
              letterSpacing="2"
            >
              🌿
            </text>
            <path
              d="M 16 60 A 44 44 0 0 1 104 60"
              stroke="#00d97a"
              strokeWidth="0.5"
              fill="none"
              id="stamp-top-arc"
            />
            <text fill="#00d97a" fontSize="8" letterSpacing="3" fontWeight="700">
              <textPath href="#stamp-top-arc" startOffset="12%">CANNA PASSPORT</textPath>
            </text>
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-8">

          {/* Eyebrow tag */}
          <div
            className="hero-el-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{
              background: "rgba(0, 217, 122, 0.08)",
              border: "1px solid rgba(0, 217, 122, 0.2)",
              color: "rgba(0, 217, 122, 0.92)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full hero-dot"
              style={{ background: "#00d97a" }}
            />
            {t("tagline")}
          </div>

          {/* Headline — Playfair Display editorial treatment */}
          <h1
            className="hero-el-2 font-display font-black leading-[1.02] tracking-tight"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              background: "linear-gradient(155deg, #ffffff 0%, #c8f0da 32%, #00d97a 72%, #009c5a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            {t("headline")}
          </h1>

          {/* Subheadline — better contrast */}
          <p
            className="hero-el-3 text-base sm:text-lg md:text-xl max-w-xl leading-[1.65]"
            style={{ color: "rgba(190, 228, 208, 0.88)" }}
          >
            {t("subheadline")}
          </p>

          {/* CTA group */}
          <div className="hero-el-4 flex flex-col sm:flex-row items-center gap-3 mt-1">
            <Link
              href="/countries"
              className="hero-btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #00d97a 0%, #008f51 100%)",
                color: "#fff",
                letterSpacing: "0.01em",
                minHeight: "44px",
              }}
              aria-label="Ver todos os destinos de cannabis legal"
            >
              {t("cta")}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>


        </div>

      </section>
    </>
  );
}
