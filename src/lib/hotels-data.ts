// ─── Types ──────────────────────────────────────────────────────────────────

export type HotelType =
  | "hotel"
  | "hostel"
  | "bnb"
  | "apartment"
  | "resort"
  | "editorial";

export type HotelPlatform = "booking" | "direct";

export interface HotelLink {
  platform: HotelPlatform;
  url: string;
  label?: string;
}

export interface Hotel {
  id: string;
  countrySlug: string;
  city: string;
  name: { pt: string; en: string };
  description: { pt: string; en: string };
  type: HotelType;
  priceRange: string;
  links: HotelLink[];
  highlighted: boolean;
  warning?: { pt: string; en: string };
}

// ─── Affiliate ID ────────────────────────────────────────────────────────────
// Substituir YOUR_BOOKING_AID pelo AID real após aprovação na Awin/Booking.com

const BOOKING_AID = "YOUR_BOOKING_AID";

function booking(slug: string): string {
  return `https://www.booking.com${slug}?aid=${BOOKING_AID}`;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const HOTELS: Hotel[] = [
  // ── CANADA ──────────────────────────────────────────────────────────────
  {
    id: "ca-sir-sams",
    countrySlug: "canada",
    city: "Eagle Lake, Ontario",
    name: {
      pt: "Sir Sam's Inn & Spa",
      en: "Sir Sam's Inn & Spa",
    },
    description: {
      pt: "Primeiro resort cannabis-friendly do Canadá. Consumo permitido em varandas e áreas externas. Adultos apenas. Inclui spa completo à beira do lago.",
      en: "Canada's first cannabis-friendly resort. Consumption allowed on balconies and outdoor areas. Adults only. Includes full lakeside spa.",
    },
    type: "resort",
    priceRange: "CA$130–180/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/ca/sir-sam-39-s-inn-amp-spa.html"),
        label: "Booking.com",
      },
    ],
    highlighted: true,
  },
  {
    id: "ca-cannabis-air",
    countrySlug: "canada",
    city: "Toronto, Ontario",
    name: {
      pt: "Cannabis Air Hotel",
      en: "Cannabis Air Hotel",
    },
    description: {
      pt: "Hotel boutique no centro de Toronto com varandas privativas para consumo. O uso interno é proibido por lei em Ontario; o diferencial são os pátios privativos.",
      en: "Boutique hotel in downtown Toronto with private balconies for consumption. Indoor use is prohibited by Ontario law; the highlight is the private patios.",
    },
    type: "hotel",
    priceRange: "CA$149/noite",
    links: [
      {
        platform: "direct",
        url: "https://budhub.ca/listing/cannabis-air-luxury-hotel-toronto/",
        label: "Site oficial",
      },
    ],
    highlighted: false,
  },

  // ── NETHERLANDS ─────────────────────────────────────────────────────────
  {
    id: "nl-bulldog",
    countrySlug: "netherlands",
    city: "Amsterdam",
    name: {
      pt: "The Bulldog Hotel",
      en: "The Bulldog Hotel",
    },
    description: {
      pt: "O hotel cannabis-friendly mais famoso do mundo. Fica acima do icônico coffeeshop Bulldog, no coração de Amsterdã. Atmosfera única e localização central.",
      en: "The world's most famous cannabis-friendly hotel. Located above the iconic Bulldog coffeeshop in the heart of Amsterdam. Unique atmosphere and central location.",
    },
    type: "hostel",
    priceRange: "€59–120/noite",
    links: [
      {
        platform: "direct",
        url: "https://bulldoghotel.com",
        label: "Site oficial",
      },
    ],
    highlighted: true,
  },
  {
    id: "nl-redlight-studio",
    countrySlug: "netherlands",
    city: "Amsterdam",
    name: {
      pt: "RedLight District Smokers Friendly Studio",
      en: "RedLight District Smokers Friendly Studio",
    },
    description: {
      pt: "Estúdio privado no Bairro da Luz Vermelha que permite consumo de cannabis dentro do apartamento. Localização privilegiada no centro histórico.",
      en: "Private studio in the Red Light District that allows cannabis consumption inside the apartment. Prime location in the historic city center.",
    },
    type: "apartment",
    priceRange: "€190–275/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/nl/redlight-district-private-smokers-friendly-studio.html"),
        label: "Booking.com",
      },
    ],
    highlighted: true,
  },

  // ── USA ─────────────────────────────────────────────────────────────────
  {
    id: "us-420-bnb-denver",
    countrySlug: "usa",
    city: "Denver, Colorado",
    name: {
      pt: "420 Friendly BnB Denver",
      en: "420 Friendly BnB Denver",
    },
    description: {
      pt: "Cannabis liberado dentro e fora. Próximo ao Red Rocks (24 km) e ao centro de Denver (9 km). Ideal para quem quer explorar a cena cannábica do Colorado.",
      en: "Cannabis allowed inside and out. Close to Red Rocks (15 mi) and downtown Denver (5.9 mi). Ideal for exploring Colorado's cannabis scene.",
    },
    type: "bnb",
    priceRange: "US$80–130/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/us/cannabis-friendly-bnb-minutes-from-downtown-denver-and-red-rocks.html"),
        label: "Booking.com",
      },
    ],
    highlighted: true,
  },
  {
    id: "us-ganja-getaway",
    countrySlug: "usa",
    city: "Colorado Springs, Colorado",
    name: {
      pt: "The Ganja Getaway",
      en: "The Ganja Getaway",
    },
    description: {
      pt: "Casa de férias 420-friendly completa em Colorado Springs. Consumo permitido em todos os ambientes, com suprimentos fornecidos aos hóspedes.",
      en: "Fully 420-friendly vacation rental in Colorado Springs. Consumption allowed throughout, with supplies provided to guests.",
    },
    type: "bnb",
    priceRange: "US$90–150/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/us/the-ganja-getaway.html"),
        label: "Booking.com",
      },
    ],
    highlighted: true,
  },
  {
    id: "us-hotel-kabuki",
    countrySlug: "usa",
    city: "San Francisco, California",
    name: {
      pt: "Hotel Kabuki (JdV by Hyatt)",
      en: "Hotel Kabuki (JdV by Hyatt)",
    },
    description: {
      pt: "Hotel 4 estrelas em Japantown com o 'Herbal Trip Package': guia de dispensários, kit de snacks, minibar e late check-out. Não inclui consumo no quarto.",
      en: "4-star hotel in Japantown with the 'Herbal Trip Package': dispensary guide, snack kit, minibar, and late check-out. Room consumption not included.",
    },
    type: "hotel",
    priceRange: "US$200–280/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/us/miyako.html"),
        label: "Booking.com",
      },
    ],
    highlighted: true,
  },
  {
    id: "us-noes-nest",
    countrySlug: "usa",
    city: "San Francisco, California",
    name: {
      pt: "Noe's Nest B&B",
      en: "Noe's Nest B&B",
    },
    description: {
      pt: "B&B vitoriano em Noe Valley com política explícita de consumo no jardim. Pequeno, charmoso e bem avaliado por viajantes cannabis-friendly.",
      en: "Victorian B&B in Noe Valley with an explicit cannabis consumption policy in the garden. Small, charming, and highly rated by cannabis-friendly travelers.",
    },
    type: "bnb",
    priceRange: "US$120–180/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/us/noe-39-s-nest-bed-and-breakfast.html"),
        label: "Booking.com",
      },
    ],
    highlighted: false,
  },

  // ── URUGUAY ─────────────────────────────────────────────────────────────
  {
    id: "uy-thc-hostel",
    countrySlug: "uruguay",
    city: "La Barra, Punta del Este",
    name: {
      pt: "THC Hostel",
      en: "THC Hostel",
    },
    description: {
      pt: "Hostel cannabis-friendly em La Barra, próximo às praias de Punta del Este. Café da manhã e WiFi inclusos.",
      en: "Cannabis-friendly hostel in La Barra, close to Punta del Este beaches. Breakfast and WiFi included.",
    },
    type: "hostel",
    priceRange: "US$10–43/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/uy/thc-hostel-la-barra.html"),
        label: "Booking.com",
      },
    ],
    highlighted: true,
    warning: {
      pt: "Turistas não podem comprar cannabis legalmente no Uruguai. A lei permite compra apenas a residentes cadastrados em farmácias. Consumo em espaços privados é tolerado.",
      en: "Tourists cannot legally purchase cannabis in Uruguay. The law only allows registered residents to buy at pharmacies. Consumption in private spaces is tolerated.",
    },
  },

  // ── COLOMBIA ────────────────────────────────────────────────────────────
  {
    id: "co-cannabis-retreat",
    countrySlug: "colombia",
    city: "Sabaneta, Medellín",
    name: {
      pt: "Cannabis Retreat Medellín",
      en: "Cannabis Retreat Medellín",
    },
    description: {
      pt: "Villa de luxo all-inclusive com 5 quartos em bairro residencial seguro de Sabaneta. Cannabis incluído no pacote. Café da manhã e jantar inclusos.",
      en: "Luxury all-inclusive villa with 5 bedrooms in a safe residential neighborhood in Sabaneta. Cannabis included in the package. Breakfast and dinner included.",
    },
    type: "resort",
    priceRange: "US$200+/noite",
    links: [
      {
        platform: "direct",
        url: "https://cannabisretreatmedellincolombia.com",
        label: "Site oficial",
      },
    ],
    highlighted: true,
  },

  // ── THAILAND ────────────────────────────────────────────────────────────
  {
    id: "th-rent-v38",
    countrySlug: "thailand",
    city: "Bangkok (Chatuchak)",
    name: {
      pt: "Rent V38 — Poshtel 420",
      en: "Rent V38 — Poshtel 420",
    },
    description: {
      pt: "Primeiro 'Poshtel 420' de Bangkok, aberto após a legalização de 2022. Dispensário próprio (Doobie's Farm) no lobby. Consumo permitido na varanda.",
      en: "Bangkok's first '420 Poshtel', opened after the 2022 legalization. Own dispensary (Doobie's Farm) in the lobby. Consumption allowed on the balcony.",
    },
    type: "hotel",
    priceRange: "US$41–57/noite",
    links: [
      {
        platform: "booking",
        url: booking("/hotel/th/rent-v38.html"),
        label: "Booking.com",
      },
    ],
    highlighted: true,
    warning: {
      pt: "⚠️ Desde 2025, o uso recreativo de cannabis na Tailândia requer receita médica. A situação legal está em mudança — verifique as regras atuais antes de viajar.",
      en: "⚠️ Since 2025, recreational cannabis use in Thailand requires a medical prescription. The legal situation is evolving — check current rules before traveling.",
    },
  },

  // ── EDITORIAL (sem hotéis verificados) ──────────────────────────────────
  {
    id: "de-editorial",
    countrySlug: "germany",
    city: "",
    name: {
      pt: "Dica Editorial",
      en: "Editorial Note",
    },
    description: {
      pt: "A Alemanha legalizou o cannabis em abril de 2024, mas o mercado de hospedagem cannabis-friendly ainda está em formação. Consulte o BudAndBreakfast.com para aluguéis privados em Berlin atualizados.",
      en: "Germany legalized cannabis in April 2024, but the cannabis-friendly accommodation market is still developing. Check BudAndBreakfast.com for updated private rentals in Berlin.",
    },
    type: "editorial",
    priceRange: "",
    links: [
      {
        platform: "direct",
        url: "https://www.budandbreakfast.com/property-region/germany",
        label: "BudAndBreakfast.com",
      },
    ],
    highlighted: true,
  },
  {
    id: "pt-editorial",
    countrySlug: "portugal",
    city: "",
    name: {
      pt: "Dica Editorial",
      en: "Editorial Note",
    },
    description: {
      pt: "Portugal tem um ambiente tolerante, especialmente em Bairro Alto e Cais do Sodré em Lisboa, mas nenhum hotel tem política cannabis-friendly declarada. Consulte o BudAndBreakfast.com para opções de aluguel privado.",
      en: "Portugal has a tolerant environment, especially in Bairro Alto and Cais do Sodré in Lisbon, but no hotel has a declared cannabis-friendly policy. Check BudAndBreakfast.com for private rental options.",
    },
    type: "editorial",
    priceRange: "",
    links: [
      {
        platform: "direct",
        url: "https://www.budandbreakfast.com",
        label: "BudAndBreakfast.com",
      },
    ],
    highlighted: true,
  },
  {
    id: "es-editorial",
    countrySlug: "spain",
    city: "",
    name: {
      pt: "Dica Editorial",
      en: "Editorial Note",
    },
    description: {
      pt: "A zona cinzenta legal da Espanha impede hotéis de ter política cannabis-friendly declarada. Os bairros Eixample, El Raval e Gràcia em Barcelona são os mais tolerantes. Consulte o guia de hospedagem próxima a clubs.",
      en: "Spain's legal gray area prevents hotels from having declared cannabis-friendly policies. The Eixample, El Raval, and Gràcia neighborhoods in Barcelona are the most tolerant. Check the accommodation guide near clubs.",
    },
    type: "editorial",
    priceRange: "",
    links: [
      {
        platform: "direct",
        url: "https://cannabisinbarcelona.com/en/accommodation-near-cannabis-clubs-barcelona/",
        label: "Guia Barcelona",
      },
    ],
    highlighted: true,
  },
  {
    id: "mt-editorial",
    countrySlug: "malta",
    city: "",
    name: {
      pt: "Dica Editorial",
      en: "Editorial Note",
    },
    description: {
      pt: "Em Malta, o acesso legal ao cannabis através das associações (CHRAs) é restrito a residentes. Turistas não podem se cadastrar nem comprar legalmente. Não há hotéis cannabis-friendly para turistas.",
      en: "In Malta, legal access to cannabis through associations (CHRAs) is restricted to residents. Tourists cannot register or purchase legally. There are no cannabis-friendly hotels for tourists.",
    },
    type: "editorial",
    priceRange: "",
    links: [],
    highlighted: true,
  },
];

// ─── Utils ───────────────────────────────────────────────────────────────────

export function getHotelsForCountry(countrySlug: string): Hotel[] {
  return HOTELS.filter((h) => h.countrySlug === countrySlug);
}

export function getAllHotels(): Hotel[] {
  return HOTELS;
}
