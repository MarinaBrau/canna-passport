import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
});

const BASE_URL = "https://cannapassport.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Canna Passport",
    default: "Canna Passport — Guia de Turismo de Cannabis Legal",
  },
  description:
    "Guia completo para turistas sobre cannabis legal ao redor do mundo.",
  openGraph: {
    siteName: "Canna Passport",
    type: "website",
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "Canna Passport — Guia de Turismo de Cannabis Legal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cannapassport",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Canna Passport",
  url: BASE_URL,
  description:
    "Guia digital multilíngue para turismo de cannabis legal no mundo.",
};

// suppressHydrationWarning allows [locale]/layout.tsx to update lang via useEffect
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={`${geist.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased font-sans" style={{ background: "#04090a", color: "#dff0e8" }}>
        {children}
      </body>
    </html>
  );
}
