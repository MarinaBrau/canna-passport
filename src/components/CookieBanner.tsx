"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "cp_cookie_consent";
const GA_ID = "G-435JMCK4L0";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setConsent("accepted");
    } else if (stored === "rejected") {
      setConsent("rejected");
    } else {
      // Pequeno delay para não piscar no carregamento
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
    setVisible(false);
  }

  return (
    <>
      {/* GA4 só carrega após consentimento */}
      {consent === "accepted" && <GoogleAnalytics gaId={GA_ID} />}

      {/* Banner */}
      {visible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4"
          role="dialog"
          aria-label="Aviso de cookies"
          aria-live="polite"
        >
          <div
            className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 rounded-2xl text-sm"
            style={{
              background: "rgba(6, 14, 8, 0.97)",
              border: "1px solid rgba(0, 217, 122, 0.18)",
              boxShadow: "0 -4px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,217,122,0.06)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Ícone */}
            <span className="text-lg flex-shrink-0" aria-hidden>🍪</span>

            {/* Texto */}
            <p className="flex-1 leading-relaxed" style={{ color: "rgba(180, 218, 196, 0.75)" }}>
              {t("message")}{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "rgba(0, 217, 122, 0.8)" }}
              >
                {t("learnMore")}
              </Link>
            </p>

            {/* Botões */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={reject}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(160, 200, 176, 0.2)",
                  color: "rgba(160, 200, 176, 0.55)",
                }}
              >
                {t("reject")}
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: "linear-gradient(135deg, #00d97a 0%, #008f51 100%)",
                  color: "#fff",
                }}
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
