export type TourType =
  | "walking-tour"
  | "farm-tour"
  | "dispensary-tour"
  | "boat-tour"
  | "cooking-class"
  | "wellness"
  | "museum"
  | "editorial";

export type TourPlatform = "getyourguide" | "viator" | "civitatis" | "direct";

export interface TourLink {
  platform: TourPlatform;
  url: string;
  label?: string;
}

export interface Tour {
  id: string;
  countrySlug: string;
  city: string;
  name: { pt: string; en: string };
  description: { pt: string; en: string };
  type: TourType;
  duration: string;
  priceRange: string;
  links: TourLink[];
  highlighted: boolean;
  warning?: { pt: string; en: string };
}

export const TOURS: Tour[] = [
  // ── CANADÁ ──────────────────────────────────────────────────────────────────
  {
    id: "ca-01",
    countrySlug: "canada",
    city: "Vancouver",
    name: {
      pt: "Vancouver Cannabis Tour",
      en: "Vancouver Cannabis Tour",
    },
    description: {
      pt: "Passeio guiado pelos melhores dispensários licenciados de Vancouver, com degustação e explicação sobre variedades. Inclui transporte em veículo privativo.",
      en: "Guided tour of Vancouver's top licensed dispensaries, with tasting and strain education. Includes private vehicle transport.",
    },
    type: "dispensary-tour",
    duration: "2–3h",
    priceRange: "CAD 60–120",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/vancouver-l173/cannabis-tours-tc432/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
    ],
    highlighted: true,
  },
  {
    id: "ca-02",
    countrySlug: "canada",
    city: "Toronto",
    name: {
      pt: "Toronto Cannabis Walking Tour",
      en: "Toronto Cannabis Walking Tour",
    },
    description: {
      pt: "Tour a pé pelo centro de Toronto visitando dispensários, com guia especializado e degustação de joints pré-rolados legais.",
      en: "Walking tour through downtown Toronto visiting dispensaries, with expert guide and legal pre-rolled joint tasting.",
    },
    type: "walking-tour",
    duration: "2h",
    priceRange: "CAD 50–90",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/toronto-l200/cannabis-tours-tc432/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
    ],
    highlighted: true,
  },
  {
    id: "ca-03",
    countrySlug: "canada",
    city: "Vancouver / Toronto / Calgary",
    name: {
      pt: "Canada High Tours — Múltiplas Cidades",
      en: "Canada High Tours — Multiple Cities",
    },
    description: {
      pt: "Operadora local especializada em tours de cannabis em várias cidades canadenses, com pacotes personalizados e experiências de cultivo.",
      en: "Local operator specializing in cannabis tours across multiple Canadian cities, with custom packages and grow experiences.",
    },
    type: "dispensary-tour",
    duration: "3–6h",
    priceRange: "CAD 80–200",
    links: [
      {
        platform: "direct",
        url: "https://www.canadahightours.com",
        label: "canadahightours.com",
      },
    ],
    highlighted: false,
  },

  // ── HOLANDA ─────────────────────────────────────────────────────────────────
  {
    id: "nl-01",
    countrySlug: "netherlands",
    city: "Amsterdam",
    name: {
      pt: "Amsterdam Coffeeshop Walking Tour",
      en: "Amsterdam Coffeeshop Walking Tour",
    },
    description: {
      pt: "Passeio a pé pelos coffeeshops mais icônicos de Amsterdam, visitando 3 estabelecimentos com guia local. Aprenda a história e cultura da cena canábica holandesa.",
      en: "Walking tour of Amsterdam's most iconic coffeeshops, visiting 3 establishments with a local guide. Learn the history and culture of the Dutch cannabis scene.",
    },
    type: "walking-tour",
    duration: "3h",
    priceRange: "€20–60",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/amsterdam-l36/cannabis-tours-tc432/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
    ],
    highlighted: true,
  },
  {
    id: "nl-02",
    countrySlug: "netherlands",
    city: "Amsterdam",
    name: {
      pt: "Private Coffee Shop Walking Tour",
      en: "Private Coffee Shop Walking Tour",
    },
    description: {
      pt: "Tour privativo pelos melhores coffeeshops de Amsterdam — ideal para grupos ou casais que preferem uma experiência personalizada e sem multidões.",
      en: "Private tour of Amsterdam's best coffeeshops — ideal for groups or couples who prefer a personalized experience without crowds.",
    },
    type: "walking-tour",
    duration: "2–3h",
    priceRange: "€40–80",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/amsterdam-l36/cannabis-tours-tc432/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
    ],
    highlighted: false,
  },
  {
    id: "nl-03",
    countrySlug: "netherlands",
    city: "Amsterdam",
    name: {
      pt: "Cannabis Boat Cruise nos Canais",
      en: "Cannabis Boat Cruise on the Canals",
    },
    description: {
      pt: "Cruzeiro relaxante pelos canais de Amsterdam a bordo de barco smoke-friendly. Consuma legalmente enquanto admira a cidade a partir da água.",
      en: "Relaxing cruise along Amsterdam's canals aboard a smoke-friendly boat. Consume legally while admiring the city from the water.",
    },
    type: "boat-tour",
    duration: "2h",
    priceRange: "€30–70",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/amsterdam-l36/amsterdam-smoke-friendly-cannabis-cruise-on-cloud-boat-t924596/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
    ],
    highlighted: true,
  },

  // ── ALEMANHA — editorial ─────────────────────────────────────────────────────
  {
    id: "de-01",
    countrySlug: "germany",
    city: "Berlim / diversas",
    name: {
      pt: "Experiências Culturais de Cannabis na Alemanha",
      en: "Cannabis Cultural Experiences in Germany",
    },
    description: {
      pt: "A Alemanha legalizou a posse e cultivo pessoal em 2024, mas os Cannabis Social Clubs são restritos a residentes. Turistas não têm acesso a pontos de venda licenciados. Recomendamos visitas ao Hanf Museum de Berlim e participação em eventos culturais abertos ao público.",
      en: "Germany legalized personal possession and cultivation in 2024, but Cannabis Social Clubs are restricted to residents. Tourists cannot access licensed sales points. We recommend visiting Berlin's Hanf Museum and attending public cultural events.",
    },
    type: "editorial",
    duration: "—",
    priceRange: "—",
    links: [],
    highlighted: true,
    warning: {
      pt: "Compra e venda são ilegais para turistas. Apenas posse de até 25g é tolerada.",
      en: "Purchase and sale are illegal for tourists. Only possession of up to 25g is tolerated.",
    },
  },

  // ── EUA ─────────────────────────────────────────────────────────────────────
  {
    id: "us-01",
    countrySlug: "usa",
    city: "Denver, Colorado",
    name: {
      pt: "Denver Cannabis Tour — Dispensários + Glass-Blowing",
      en: "Denver Cannabis Tour — Dispensaries + Glass-Blowing",
    },
    description: {
      pt: "Tour guiado por 2 dispensários premium de Denver com visita a estúdio de sopro de vidro artesanal. Inclui transporte e guia certificado em cannabis.",
      en: "Guided tour of 2 premium Denver dispensaries with a visit to an artisan glass-blowing studio. Includes transport and certified cannabis guide.",
    },
    type: "dispensary-tour",
    duration: "4h",
    priceRange: "USD 50–120",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/colorado-l947/cannabis-tours-tc432/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
    ],
    highlighted: true,
  },
  {
    id: "us-02",
    countrySlug: "usa",
    city: "Las Vegas, Nevada",
    name: {
      pt: "Las Vegas Cannabis Tour — Weed Lounge & Party Bus",
      en: "Las Vegas Cannabis Tour — Weed Lounge & Party Bus",
    },
    description: {
      pt: "Experiência completa em Las Vegas: party bus para adultos, acesso a weed lounge smoke-friendly, degustação de produtos premium e guia especializado.",
      en: "Complete Las Vegas experience: adult party bus, access to a smoke-friendly weed lounge, premium product tasting and expert guide.",
    },
    type: "dispensary-tour",
    duration: "3–4h",
    priceRange: "USD 60–150",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/las-vegas-l58/las-vegas-cannabis-tour-with-weed-lounge-party-bus-t536072/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
    ],
    highlighted: true,
  },
  {
    id: "us-03",
    countrySlug: "usa",
    city: "Los Angeles, California",
    name: {
      pt: "LA Weed Bus — Winery & Dispensary Crawl",
      en: "LA Weed Bus — Winery & Dispensary Crawl",
    },
    description: {
      pt: "Passeio em ônibus especial por Los Angeles, combinando visitas a vinícolas e dispensários com consumo a bordo. Uma das experiências mais únicas da Califórnia.",
      en: "Special bus tour around Los Angeles combining winery and dispensary visits with on-board consumption. One of California's most unique experiences.",
    },
    type: "dispensary-tour",
    duration: "5–6h",
    priceRange: "USD 70–160",
    links: [
      {
        platform: "direct",
        url: "https://www.cannabistours.com",
        label: "cannabistours.com",
      },
    ],
    highlighted: false,
  },

  // ── COLÔMBIA ────────────────────────────────────────────────────────────────
  {
    id: "co-01",
    countrySlug: "colombia",
    city: "Medellín",
    name: {
      pt: "Cannabis Farm Tour Medellín — Experiência na Fazenda",
      en: "Cannabis Farm Tour Medellín — Farm Experience",
    },
    description: {
      pt: "Visita guiada a uma fazenda de cannabis medicinal nos arredores de Medellín. Conheça o processo de cultivo, extração e os usos medicinais. Meio dia de imersão total.",
      en: "Guided visit to a medicinal cannabis farm in the outskirts of Medellín. Learn about the cultivation process, extraction and medicinal uses. Half-day full immersion.",
    },
    type: "farm-tour",
    duration: "4–5h",
    priceRange: "USD 40–80",
    links: [
      {
        platform: "getyourguide",
        url: "https://www.getyourguide.com/colombia-l168994/cannabis-experience-t677512/?partner_id=FKRJ2NS",
        label: "GetYourGuide",
      },
      {
        platform: "civitatis",
        url: "https://www.civitatis.com/en/medellin/rionegro-cannabis-tour/",
        label: "Civitatis",
      },
    ],
    highlighted: true,
  },
  {
    id: "co-02",
    countrySlug: "colombia",
    city: "Bogotá",
    name: {
      pt: "Bogotá Cannabis Tour — Tour Educativo",
      en: "Bogotá Cannabis Tour — Educational Walking Tour",
    },
    description: {
      pt: "Tour a pé educativo pelo centro de Bogotá abordando a história da cannabis na Colômbia, o movimento de descriminalização e os avanços na regulamentação. Saída do centro histórico.",
      en: "Educational walking tour through central Bogotá covering cannabis history in Colombia, the decriminalization movement and regulatory advances. Departs from the historic center.",
    },
    type: "walking-tour",
    duration: "3h",
    priceRange: "USD 20–50",
    links: [
      {
        platform: "civitatis",
        url: "https://www.civitatis.com/en/bogota/cannabis-tour-bogota/",
        label: "Civitatis",
      },
    ],
    highlighted: true,
  },

  // ── URUGUAI ─────────────────────────────────────────────────────────────────
  {
    id: "uy-01",
    countrySlug: "uruguay",
    city: "Montevidéu",
    name: {
      pt: "WeedTour VIP — 3 Dias em Montevidéu",
      en: "WeedTour VIP — 3 Days in Montevideo",
    },
    description: {
      pt: "Pacote premium de 3 dias em Montevidéu com guia especializado, visitas a farmácias autorizadas, encontros com produtores e imersão na cultura canábica uruguaia. O único país da América do Sul com cannabis 100% legalizado.",
      en: "Premium 3-day package in Montevideo with specialized guide, visits to authorized pharmacies, meetings with producers and immersion in Uruguayan cannabis culture. The only country in South America with fully legalized cannabis.",
    },
    type: "dispensary-tour",
    duration: "3 dias",
    priceRange: "USD 300–600",
    links: [
      {
        platform: "direct",
        url: "https://www.weedtour.net/detalhes/vip-tour/",
        label: "weedtour.net",
      },
    ],
    highlighted: true,
  },
  {
    id: "uy-02",
    countrySlug: "uruguay",
    city: "Montevidéu",
    name: {
      pt: "Cannabis Museum Montevidéu — Visita Livre",
      en: "Cannabis Museum Montevideo — Free Visit",
    },
    description: {
      pt: "O primeiro museu de cannabis da América do Sul, com exposições sobre a história da planta, o processo de legalização uruguaio e arte canábica. Visita direta sem reserva online necessária.",
      en: "The first cannabis museum in South America, with exhibitions on the plant's history, the Uruguayan legalization process and cannabis art. Walk-in visit, no online booking required.",
    },
    type: "museum",
    duration: "1–2h",
    priceRange: "Gratuito / Free",
    links: [],
    highlighted: true,
  },

  // ── PORTUGAL — editorial ─────────────────────────────────────────────────────
  {
    id: "pt-01",
    countrySlug: "portugal",
    city: "Lisboa / Porto",
    name: {
      pt: "CBD Shops e Cultura Canábica em Portugal",
      en: "CBD Shops and Cannabis Culture in Portugal",
    },
    description: {
      pt: "Portugal descriminalizou todas as drogas em 2001, mas não há cannabis tours formais para turistas. Recomendamos visitar as CBD shops em Lisboa (Bairro Alto, Intendente) e Porto (Baixa), que vendem derivados legais e são pontos de encontro da cultura local.",
      en: "Portugal decriminalized all drugs in 2001, but there are no formal cannabis tours for tourists. We recommend visiting CBD shops in Lisbon (Bairro Alto, Intendente) and Porto (Baixa), which sell legal derivatives and are hubs of local culture.",
    },
    type: "editorial",
    duration: "—",
    priceRange: "—",
    links: [],
    highlighted: true,
  },

  // ── ESPANHA ─────────────────────────────────────────────────────────────────
  {
    id: "es-01",
    countrySlug: "spain",
    city: "Barcelona",
    name: {
      pt: "Barcelona Weed Tour — Cannabis Clubs",
      en: "Barcelona Weed Tour — Cannabis Clubs",
    },
    description: {
      pt: "Tour guiado pela cena de cannabis clubs de Barcelona, com orientação legal, acesso a estabelecimentos e explicações sobre o modelo de associações privadas da Espanha.",
      en: "Guided tour of Barcelona's cannabis club scene, with legal guidance, venue access and explanations of Spain's private association model.",
    },
    type: "walking-tour",
    duration: "2–3h",
    priceRange: "€30–80",
    links: [
      {
        platform: "direct",
        url: "https://www.barcelonaweedtour.com",
        label: "barcelonaweedtour.com",
      },
    ],
    highlighted: true,
    warning: {
      pt: "Zona cinzenta legal: os cannabis clubs são oficialmente restritos a residentes espanhóis. O consumo recreacional em espaços públicos é proibido e passível de multa.",
      en: "Legal grey area: cannabis clubs are officially restricted to Spanish residents. Recreational consumption in public spaces is prohibited and subject to fines.",
    },
  },

  // ── MALTA ───────────────────────────────────────────────────────────────────
  {
    id: "mt-01",
    countrySlug: "malta",
    city: "Malta",
    name: {
      pt: "Merry-Juana Themed Tour — Veronika's Adventure",
      en: "Merry-Juana Themed Tour — Veronika's Adventure",
    },
    description: {
      pt: "Experiência temática única de 5 horas combinando aula de culinária com cannabis, trilha guiada pelas paisagens de Malta e mergulho na nova legislação maltesa. Grupo pequeno, experiência premium.",
      en: "Unique 5-hour themed experience combining a cannabis cooking class, guided hike through Malta's landscapes and deep dive into the new Maltese legislation. Small group, premium experience.",
    },
    type: "cooking-class",
    duration: "5h",
    priceRange: "€250/pessoa",
    links: [
      {
        platform: "direct",
        url: "https://www.veronikasadventure.com/merry-juana-themed-tour/",
        label: "veronikasadventure.com",
      },
    ],
    highlighted: true,
  },

  // ── TAILÂNDIA ────────────────────────────────────────────────────────────────
  {
    id: "th-01",
    countrySlug: "thailand",
    city: "Bangkok",
    name: {
      pt: "Bangkok Cannabis Tour — Dispensários e Fazenda",
      en: "Bangkok Cannabis Tour — Dispensaries & Farm",
    },
    description: {
      pt: "Tour guiado pelos principais dispensários de Bangkok com visita a uma fazenda de cannabis medicinal. Inclui degustação de produtos CBD e educação sobre a indústria tailandesa.",
      en: "Guided tour of Bangkok's top cannabis dispensaries with a visit to a medicinal cannabis farm. Includes CBD product tasting and education about the Thai industry.",
    },
    type: "dispensary-tour",
    duration: "4–5h",
    priceRange: "THB 1500–3000",
    links: [
      {
        platform: "direct",
        url: "https://www.bangkokcannabisplaza.com/cannabis-tour/",
        label: "bangkokcannabisplaza.com",
      },
    ],
    highlighted: true,
    warning: {
      pt: "Atenção: o uso recreacional foi recriminalizado na Tailândia em 2024. O consumo público é proibido. Apenas uso medicinal com prescrição é permitido.",
      en: "Warning: recreational use was recriminalized in Thailand in 2024. Public consumption is prohibited. Only medical use with a prescription is allowed.",
    },
  },
  {
    id: "th-02",
    countrySlug: "thailand",
    city: "Chiang Mai",
    name: {
      pt: "MJB Farm Tour Chiang Mai — Semente ao Produto",
      en: "MJB Farm Tour Chiang Mai — Seed to Product",
    },
    description: {
      pt: "Visita à fazenda de cannabis medicinal MJB em Chiang Mai, explorando todas as etapas do cultivo, da semente ao produto final. Foco educativo e medicinal.",
      en: "Visit to MJB's medicinal cannabis farm in Chiang Mai, exploring all stages of cultivation from seed to final product. Educational and medicinal focus.",
    },
    type: "farm-tour",
    duration: "3–4h",
    priceRange: "THB 800–1500",
    links: [
      {
        platform: "direct",
        url: "https://www.mjbfarm.com",
        label: "mjbfarm.com",
      },
    ],
    highlighted: true,
    warning: {
      pt: "Atenção: o uso recreacional foi recriminalizado na Tailândia em 2024. O consumo público é proibido. Apenas uso medicinal com prescrição é permitido.",
      en: "Warning: recreational use was recriminalized in Thailand in 2024. Public consumption is prohibited. Only medical use with a prescription is allowed.",
    },
  },
  {
    id: "th-03",
    countrySlug: "thailand",
    city: "Chiang Mai",
    name: {
      pt: "Cannabis Farm — Da Semente à Fumaça",
      en: "Cannabis Farm — From Seed to Smoke",
    },
    description: {
      pt: "Experiência imersiva em fazenda de cannabis em Chiang Mai: acompanhe o processo completo de cultivo, conheça os produtores e entenda a cadeia produtiva do cannabis medicinal tailandês.",
      en: "Immersive cannabis farm experience in Chiang Mai: follow the complete cultivation process, meet producers and understand the Thai medicinal cannabis supply chain.",
    },
    type: "farm-tour",
    duration: "5–6h",
    priceRange: "THB 1200–2500",
    links: [
      {
        platform: "direct",
        url: "https://www.takemetour.com/trip/cannabis-farm-tour-from-seed-to-smoke",
        label: "TakeMeTour",
      },
    ],
    highlighted: false,
    warning: {
      pt: "Atenção: o uso recreacional foi recriminalizado na Tailândia em 2024. O consumo público é proibido. Apenas uso medicinal com prescrição é permitido.",
      en: "Warning: recreational use was recriminalized in Thailand in 2024. Public consumption is prohibited. Only medical use with a prescription is allowed.",
    },
  },
];

/** Retorna todos os tours de um país pelo slug. */
export function getToursForCountry(slug: string): Tour[] {
  return TOURS.filter((t) => t.countrySlug === slug);
}

/** Retorna todos os tours. */
export function getAllTours(): Tour[] {
  return TOURS;
}
