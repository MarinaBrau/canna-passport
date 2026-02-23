"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
  /** If true, injects inline FAQPage JSON-LD (use only when not already injected by page.tsx) */
  injectJsonLd?: boolean;
}

export function FaqSection({
  faqs,
  title = "FAQ",
  injectJsonLd = false,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const jsonLd = injectJsonLd
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      }
    : null;

  return (
    <section className="mt-10" aria-label={title}>
      {injectJsonLd && jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <h2 className="text-xl font-semibold text-zinc-900 mb-4">{title}</h2>

      <dl className="space-y-2">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-zinc-200 rounded-lg overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-inset"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`ml-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 10.586L2.707 5.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414L8 10.586z" />
                    </svg>
                  </span>
                </button>
              </dt>
              {isOpen && (
                <dd className="px-5 pb-4 pt-1 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100">
                  {faq.answer}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
