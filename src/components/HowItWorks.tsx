"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

const STEP_ICONS = [
  // Step 1: Choose destination — compass SVG
  (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="24,10 27,22 24,26 21,22" fill="currentColor" opacity="0.9" />
      <polygon points="24,38 21,26 24,22 27,26" fill="currentColor" opacity="0.35" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  ),
  // Step 2: Read the guide — open book SVG
  (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 36V12c0-1.1.9-2 2-2h10c2.2 0 4 1.8 4 4v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 36V12c0-1.1-.9-2-2-2H28c-2.2 0-4 1.8-4 4v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 36h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 16h6M14 21h6M14 26h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M28 16h6M28 21h6M28 26h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  // Step 3: Travel safely — airplane SVG
  (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M40 14l-8 8-18-4-4 4 14 8-4 8 4-1 6-10 10 6 2-4-8-6 6-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
      <path d="M8 36h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M12 40h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
];

export function HowItWorks() {
  const t = useTranslations("home.howItWorks");
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    { number: "01", title: t("step1.title"), description: t("step1.description") },
    { number: "02", title: t("step2.title"), description: t("step2.description") },
    { number: "03", title: t("step3.title"), description: t("step3.description") },
  ];

  // Scroll-triggered entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".how-step");

    // Set initial hidden state
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(36px)";
      card.style.transitionDelay = `${i * 0.14}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-32px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .how-step {
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                      transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .how-dash {
          height: 1px;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(0, 217, 122, 0.42) 0px,
            rgba(0, 217, 122, 0.42) 8px,
            transparent 8px,
            transparent 18px
          );
          background-size: 200% 100%;
          animation: cp-dash-flow 2s linear infinite;
        }
        .how-icon-wrap {
          transition: box-shadow 0.35s ease, background 0.35s ease;
        }
        .how-step:hover .how-icon-wrap {
          box-shadow:
            0 0 44px rgba(0, 217, 122, 0.42),
            inset 0 0 28px rgba(0, 217, 122, 0.06) !important;
          background: rgba(0, 217, 122, 0.12) !important;
        }
        .how-number {
          transition: color 0.2s, box-shadow 0.2s;
        }
        .how-step:hover .how-number {
          box-shadow: 0 0 16px rgba(0, 217, 122, 0.7);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="py-28 px-4 relative overflow-hidden"
        style={{ background: "var(--cp-bg-surface)" }}
      >
        {/* Background grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 122, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 122, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        {/* Ambient glow center */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(0, 217, 122, 0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section header */}
          <div className="text-center mb-20">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3"
              style={{ color: "rgba(0, 217, 122, 0.62)" }}
            >
              Como usar
            </p>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                background: "linear-gradient(135deg, #dff0e8 0%, #00d97a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("title")}
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-14">
            {/* Animated dashed connector — desktop only */}
            <div
              aria-hidden
              className="hidden md:block absolute top-[62px] left-[calc(33.33%+12px)] right-[calc(33.33%+12px)]"
              style={{ zIndex: 0 }}
            >
              <div className="how-dash" />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="how-step relative flex flex-col items-center text-center gap-6"
                style={{ zIndex: 1 }}
              >
                {/* Icon container */}
                <div className="relative">
                  <div
                    className="how-icon-wrap w-[124px] h-[124px] rounded-[22px] flex items-center justify-center"
                    style={{
                      background: "rgba(0, 217, 122, 0.07)",
                      border: "1px solid rgba(0, 217, 122, 0.14)",
                      boxShadow:
                        "0 0 28px rgba(0, 217, 122, 0.12), inset 0 0 28px rgba(0, 217, 122, 0.03)",
                      color: "#00d97a",
                    }}
                  >
                    {STEP_ICONS[i]}
                  </div>

                  {/* Step number badge */}
                  <div
                    className="how-number absolute -top-3.5 -right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black"
                    style={{
                      background: "linear-gradient(135deg, #00d97a, #008f51)",
                      color: "#fff",
                      boxShadow: "0 0 16px rgba(0, 217, 122, 0.65)",
                    }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="font-semibold text-lg mb-2.5"
                    style={{ color: "#dff0e8" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.7] max-w-[260px] mx-auto"
                    style={{ color: "rgba(180, 218, 196, 0.70)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
