# PRP: Passeios e Experiências de Cannabis por País

## Introduction

Adicionar uma seção de **passeios e experiências** diretamente relacionados ao turismo de cannabis em cada país do guia. A feature expõe tours reais encontrados em plataformas como GetYourGuide e Viator (ambas com programa de afiliados de 8% de comissão), permitindo monetização futura. Os dados são estáticos (`lib/tours-data.ts`), com links que serão substituídos por links de afiliados após registro nas plataformas.

**Programas de afiliados disponíveis:**
- **GetYourGuide:** 8% comissão, cookie 31 dias → [partner.getyourguide.com](https://partner.getyourguide.com)
- **Viator:** 8% comissão, cookie 30 dias → [partnerresources.viator.com](https://partnerresources.viator.com)

> ⚠️ Para ativar os links de afiliados: registrar conta em ambas as plataformas e substituir as URLs em `src/lib/tours-data.ts` com os links afiliados gerados.

---

## Goals

- Exibir tours de cannabis disponíveis para todos os 10 países, com links para reserva
- Criar nova página `/tours` com listagem geral e filtro por país
- Integrar seção "Experiências" na página de guia de cada país
- Suportar PT e EN nativamente (next-intl)
- Preparar estrutura de links para afiliação futura no GetYourGuide e Viator
- Gerar receita potencial via comissões de afiliados (~8% por reserva)

---

## Dados dos Tours por País (pesquisados)

### 🍁 Canadá
- **Vancouver Cannabis Tour** — GetYourGuide, walking/vehicle tour, 2–3h
- **Toronto Cannabis Tour** — GetYourGuide, walking tour + joints, 2h
- **Canada High Tours** — direto, múltiplas cidades (Vancouver, Toronto, Calgary)

### 🌷 Holanda (Amsterdam)
- **Amsterdam Coffeeshop Walking Tour** — GetYourGuide, 3 coffeeshops, €20–60
- **Private Coffee Shop Walking Tour** — GetYourGuide, tour privativo, €20–60
- **Cannabis Boat Cruise** — GetYourGuide, passeio de barco nos canais, €20–60

### 🇩🇪 Alemanha
- Sem tours específicos disponíveis para turistas (restrição de residência)
- Nota editorial: informar que experiências são limitadas a contexto cultural

### 🇺🇸 EUA
- **Denver Cannabis Tour** — GetYourGuide, 2 dispensários + glass-blowing, Colorado
- **Las Vegas Cannabis Tour with Weed Lounge & Party Bus** — GetYourGuide
- **LA Weed Bus** — direto, winery + dispensary crawl, Los Angeles

### 🇨🇴 Colômbia
- **Cannabis Farm Tour Medellín** — GetYourGuide/Civitatis, farm medicinal, meio-dia
- **Bogotá Cannabis Tour** — Civitatis, walking tour educativo, saída do centro

### 🇺🇾 Uruguai
- **WeedTour VIP** — direto (weedtour.net), 3 dias, Montevidéu, premium
- **Cannabis Museum Montevidéu** — visita ao primeiro museu de cannabis da América do Sul

### 🇵🇹 Portugal
- Sem cannabis tours — apenas visitas a CBD shops
- Nota editorial: recomendar CBD shops em Lisboa e Porto

### 🇪🇸 Espanha (Barcelona)
- **Barcelona Weed Tour** — direto (barcelonaweedtour.com), acesso a cannabis clubs
- ⚠️ Disclaimer obrigatório: área cinzenta legal, clubs são para residentes oficialmente

### 🇲🇹 Malta
- **Merry-juana Themed Tour** (Veronika's Adventure) — €250/pessoa, cooking class + hiking, 5h

### 🇹🇭 Tailândia
- **Bangkok Cannabis Tour** — direto (bangkokcannabisplaza.com), dispensários + farm
- **MJB Farm Tour Chiang Mai** — direto (mjbfarm.com), farm de cannabis medicinal
- **Cannabis Farm Tour from Seed to Smoke** — TakeMeTour, Chiang Mai, farm-to-experience
- ⚠️ Disclaimer obrigatório: uso recreacional proibido desde 2024

---

## User Stories

### US-001: Criar arquivo de dados tipado dos tours
**Description:** Como desenvolvedor, preciso de um arquivo TypeScript centralizado com todos os tours de cada país para que os componentes possam renderizar os dados de forma consistente.

**Acceptance Criteria:**
- [ ] Arquivo `src/lib/tours-data.ts` criado com tipos `Tour`, `TourLink`, `TourType`
- [ ] `TOURS` array exportado com todos os tours dos 10 países (mínimo 1 tour por país, nota editorial quando não há)
- [ ] Cada tour tem: `id`, `countrySlug`, `city`, `name.pt`, `name.en`, `description.pt`, `description.en`, `type`, `duration`, `priceRange`, `links[]`, `highlighted`, `warning?`
- [ ] Função `getToursForCountry(slug)` exportada
- [ ] Função `getAllTours()` exportada
- [ ] Typecheck passa

### US-002: Adicionar chaves de i18n para a seção de tours
**Description:** Como desenvolvedor, preciso de chaves de tradução para a feature de tours funcionar em PT e EN.

**Acceptance Criteria:**
- [ ] Namespace `"tours"` adicionado em `pt.json` com chaves: `title`, `subtitle`, `bookOn`, `viewAll`, `noTours`, `disclaimer`, `filterAll`, e labels para cada `TourType`
- [ ] Mesmo namespace adicionado em `en.json` com traduções em inglês
- [ ] Chave `"tours"` adicionada em `nav` em ambos os arquivos
- [ ] Chave `"tours"` adicionada em `footer` em ambos os arquivos
- [ ] Typecheck passa

### US-003: Criar componente TourCard
**Description:** Como visitante, quero ver um card visual com nome, tipo, duração, preço e link de reserva de cada passeio.

**Acceptance Criteria:**
- [ ] Componente `src/components/TourCard.tsx` criado como Server Component
- [ ] Exibe: nome (localizado), badge de tipo, cidade, duração, faixa de preço, plataforma(s) de reserva
- [ ] Badges por plataforma: GetYourGuide (verde), Viator (azul), Civitatis (laranja), direto (cinza)
- [ ] Links abrem em `_blank` com `rel="noopener noreferrer"`
- [ ] Quando tour tem `warning`, exibe banner de aviso amarelo
- [ ] Estilo segue palette do projeto (`#00d97a`, `#04090a`, Geist)
- [ ] Typecheck passa

### US-004: Criar página /tours com filtro por país
**Description:** Como visitante, quero ver todos os passeios disponíveis em uma única página com filtro por país.

**Acceptance Criteria:**
- [ ] Rota `src/app/[locale]/tours/page.tsx` criada e acessível em `/pt/tours` e `/en/tours`
- [ ] Filtro por país (dropdown ou tabs) — client component, estado na URL via searchParams
- [ ] Grid de `TourCard` componentes
- [ ] Disclaimer de afiliados visível ("Podemos receber comissão em reservas feitas via nossos links")
- [ ] SEO: `generateMetadata` com título e description localizados
- [ ] Estado vazio quando filtro não tem resultados
- [ ] Países sem tours mostram nota editorial
- [ ] Typecheck passa

### US-005: Criar seção ToursSection e integrar nas páginas de país
**Description:** Como visitante, quero ver os passeios disponíveis diretamente na página do guia do país.

**Acceptance Criteria:**
- [ ] Componente `src/components/ToursSection.tsx` criado como Server Component
- [ ] Exibe até 3 tours `highlighted: true` do país com `TourCard` compacto
- [ ] Link "Ver todos os passeios" aponta para `/tours?country=slug`
- [ ] Integrado em `src/app/[locale]/countries/[slug]/page.tsx` após o conteúdo MDX e antes do footer
- [ ] Quando país não tem tours, exibe nota editorial informativa (sem seção vazia)
- [ ] Typecheck passa

### US-006: Adicionar "Tours" à navegação
**Description:** Como visitante, quero acessar a página de tours a partir do navbar e footer.

**Acceptance Criteria:**
- [ ] Link "Tours" (PT) / "Tours" (EN) adicionado em `Navbar.tsx` no desktop e mobile
- [ ] Link "Tours" adicionado em `Footer.tsx` na seção de links
- [ ] Links usam o componente `Link` do `@/i18n/navigation`
- [ ] Typecheck passa

---

## Functional Requirements

- FR-1: Todos os tours têm link externo para plataforma de reserva (GetYourGuide, Viator, Civitatis, direto)
- FR-2: Links têm estrutura preparada para afiliados (URL completa, fácil substituição por link afiliado)
- FR-3: Tours com risco legal exibem `warning` em amarelo (Espanha, Tailândia, Alemanha)
- FR-4: A página `/tours` filtra por país via URL searchParam `?country=slug`
- FR-5: `ToursSection` no país exibe apenas tours `highlighted: true` (máximo 3)
- FR-6: Disclaimer de afiliados visível na página `/tours`
- FR-7: Países sem tours exibem nota editorial (não seção em branco)
- FR-8: Build estático (`generateStaticParams`) funciona para `/tours` em PT e EN

## Non-Goals

- Sem sistema de reserva interno — apenas links externos
- Sem avaliações ou ratings de tours
- Sem filtros por tipo de tour na /tours (por ora — pode vir depois)
- Sem CDN de imagens para os tours (usar ícones/badges por tipo)
- Sem notificações ou favoritos
- Sem preços em tempo real — apenas faixa editorial

---

## Design Considerations

- Palette existente: `#00d97a` (verde), `#04090a` (bg dark), `#dff0e8` (texto)
- Tour type badges coloridos por categoria:
  - `walking-tour` → verde-esmeralda
  - `farm-tour` → âmbar
  - `dispensary-tour` → verde accent
  - `boat-tour` → azul
  - `cooking-class` → laranja
  - `wellness` → roxo
  - `museum` → indigo
- Platform badges: GYG (verde escuro), Viator (azul), Civitatis (laranja), Direto (cinza)
- Cards seguem estilo dos `dest-card` existentes em `FeaturedDestinations.tsx`
- Warning banner: fundo âmbar sutil, borda âmbar, ícone ⚠️

---

## Technical Considerations

- `ToursSection` e `TourCard` são Server Components (dados estáticos, sem fetch)
- A página `/tours` precisa de um Client Component wrapper para o filtro (URL searchParams)
- `getToursForCountry(slug)` recebe o locale para localizar nome/descrição
- Os links de afiliado são substituídos editando apenas `src/lib/tours-data.ts` — zero mudança nos componentes
- Adicionar `/[locale]/tours` ao `src/app/sitemap.ts` existente

---

## Success Metrics

- Todos os 10 países têm conteúdo (tour real ou nota editorial)
- Mínimo de 15 tours reais indexados na `/tours`
- Build estático passa sem erros
- Links abrem nas plataformas corretas

---

## Open Questions

- Qual `partner_id` do GetYourGuide após registro? (substituir em `tours-data.ts`)
- Qual `mcid` do Viator após registro?
- Quer adicionar a `/tours` ao sitemap com priority alta (ex: 0.8)?
- Quer disclaimer de afiliados em PT e EN?
