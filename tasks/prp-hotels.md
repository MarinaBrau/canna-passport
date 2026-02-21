# PRP: Hotéis Cannabis-Friendly

## Introduction
Adicionar uma seção de hotéis cannabis-friendly ao Canna Passport, com dados curados manualmente (como os tours), página dedicada `/hotels` com filtro por país, e seção integrada nas páginas de cada país. Links de afiliado via Booking.com Affiliate Programme.

## Goals
- Listar hotéis verificados e cannabis-friendly para cada país do guia
- Exibir seção de hotéis nas páginas de país (até 3 destacados)
- Criar página `/hotels` com filtro por país
- Monetizar via Booking.com Affiliate Programme (`?aid=YOUR_AID`)
- Para países sem hotéis verificados: exibir nota editorial informativa

## Afiliados — Setup necessário (usuário)
Antes do deploy final, cadastrar no **Booking.com Affiliate Programme**:
- URL: https://www.booking.com/affiliate-program/v2/index.html
- Gratuito, aprovação em ~48h
- Substituir `YOUR_BOOKING_AID` pelo AID real em `hotels-data.ts`
- Comissão: ~4% sobre reservas confirmadas

---

## Dados pesquisados (hotéis verificados por país)

### Canada
- **Sir Sam's Inn & Spa** — Eagle Lake, ON — Resort — $130–180/noite
  - Booking: `/hotel/ca/sir-sam-39-s-inn-amp-spa.html`
  - Primeiro resort cannabis-friendly do Canadá (parceria oficial desde 2019). Consumo em varandas e áreas externas. Adults-only.
- **Cannabis Air Hotel** — Toronto, ON — Hotel boutique — $149/noite
  - Direto: budhub.ca
  - Varandas privativas para consumo. Sem Booking.com.

### Netherlands (Amsterdam)
- **The Bulldog Hotel** — Amsterdam — Hostel — €59–120/noite
  - Direto: bulldoghotel.com
  - O hotel cannabis-friendly mais famoso do mundo. Fica sobre o coffeeshop Bulldog.
- **RedLight District Smokers Friendly Studio** — Amsterdam — Apartamento — €190–275/noite
  - Booking: `/hotel/nl/redlight-district-private-smokers-friendly-studio.html`
  - Aceita cannabis no apartamento.

### USA
- **420 Friendly BnB Denver** — Denver, CO — BnB — $80–130/noite
  - Booking: `/hotel/us/cannabis-friendly-bnb-minutes-from-downtown-denver-and-red-rocks.html`
  - Cannabis liberado dentro e fora. Próximo ao Red Rocks.
- **The Ganja Getaway** — Colorado Springs, CO — Casa de férias — $90–150/noite
  - Booking: `/hotel/us/the-ganja-getaway.html`
  - 420-friendly completo, suprimentos fornecidos.
- **Hotel Kabuki** (JdV by Hyatt) — San Francisco, CA — Hotel 4★ — $200–280/noite
  - Booking: `/hotel/us/miyako.html`
  - "Herbal Trip Package" com guia de dispensários e munchies kit.
- **Noe's Nest B&B** — San Francisco, CA — B&B — $120–180/noite
  - Booking: `/hotel/us/noe-39-s-nest-bed-and-breakfast.html`
  - Consumo no jardim permitido.

### Uruguay
- **THC Hostel** — La Barra (Punta del Este) — Hostel — $10–43/noite
  - Booking: `/hotel/uy/thc-hostel-la-barra.html`
  - ⚠️ Turistas não podem comprar legalmente. Cannabis apenas se recebido como presente de residente.

### Colombia
- **Cannabis Retreat Medellín** — Sabaneta, Medellín — Retiro privado — $200+/noite
  - Direto: cannabisretreatmedellincolombia.com
  - Villa all-inclusive com cannabis incluído no pacote.

### Thailand
- **Rent V38** — Bangkok (Chatuchak) — Poshtel — $41–57/noite
  - Booking: `/hotel/th/rent-v38.html`
  - ⚠️ Desde 2025, uso recreativo requer receita médica. Confirmar situação atual.
  - Dispensário próprio (Doobie's Farm) no lobby. Consumo na varanda permitido.

### Germany, Portugal, Spain, Malta — Editorial
Sem hotéis com política verificada. Conteúdo informativo com link para BudAndBreakfast.com como recurso.

---

## User Stories

### US-001: Criar src/lib/hotels-data.ts com tipos e dados
**Descrição:** Como desenvolvedor, preciso de uma estrutura de dados para os hotéis cannabis-friendly com tipos TypeScript e funções utilitárias.

**Acceptance Criteria:**
- [ ] Tipo `HotelType = 'hotel' | 'hostel' | 'bnb' | 'apartment' | 'resort' | 'editorial'`
- [ ] Tipo `HotelPlatform = 'booking' | 'direct'`
- [ ] Tipo `HotelLink = { platform: HotelPlatform; url: string; label?: string }`
- [ ] Tipo `Hotel = { id, countrySlug, city, name:{pt,en}, description:{pt,en}, type, priceRange, links:HotelLink[], highlighted, warning?:{pt,en} }`
- [ ] Array `HOTELS` exportado com todos os hotéis pesquisados (ver dados acima)
- [ ] Links Booking.com com `?aid=YOUR_BOOKING_AID` (placeholder)
- [ ] Funções `getHotelsForCountry(slug)` e `getAllHotels()` exportadas
- [ ] Hotéis editoriais (DE, PT, ES, MT) com type='editorial' e sem links
- [ ] Typecheck passa

### US-002: Adicionar i18n para hotéis
**Descrição:** Como desenvolvedor, preciso das strings traduzidas para a feature de hotéis em PT e EN.

**Acceptance Criteria:**
- [ ] Namespace `hotels` em pt.json: title, subtitle, bookOn, viewAll, noHotels, disclaimer, filterAll, types.{hotel, hostel, bnb, apartment, resort, editorial}
- [ ] Namespace `hotels` em en.json com equivalentes em inglês
- [ ] Chave `hotels` adicionada em `nav` e `footer` em ambos os arquivos
- [ ] Typecheck passa

### US-003: Criar componente HotelCard.tsx
**Descrição:** Como usuário, quero ver cards de hotéis com nome, tipo, cidade, faixa de preço e botão de reserva.

**Acceptance Criteria:**
- [ ] Server Component (sem 'use client')
- [ ] Props: `hotel: Hotel`, `locale: string`, `compact?: boolean`
- [ ] Exibe: nome (locale-aware), badge de tipo, cidade, faixa de preço
- [ ] Botão de reserva com badge de plataforma (Booking.com = azul, direto = cinza)
- [ ] Banner ⚠️ âmbar quando `hotel.warning` existe
- [ ] `compact=true` versão reduzida (sem descrição)
- [ ] Links com `target='_blank'` e `rel='noopener noreferrer'`
- [ ] Typecheck passa

### US-004: Criar HotelsSection para páginas de país
**Descrição:** Como usuário, quero ver hotéis cannabis-friendly na página de cada país, logo abaixo dos tours.

**Acceptance Criteria:**
- [ ] Server Component
- [ ] Props: `countrySlug: string`, `locale: string`
- [ ] Exibe até 3 hotéis `highlighted` com `HotelCard compact=true`
- [ ] Hotéis editoriais: exibe nota informativa sem botão de reserva
- [ ] Link "Ver todos os hotéis" → `/hotels?country=slug`
- [ ] Integrado em `src/app/[locale]/countries/[slug]/page.tsx` após `ToursSection`
- [ ] Todos os 10 países renderizam sem erro
- [ ] Typecheck passa

### US-005: Criar página /hotels com filtro por país
**Descrição:** Como usuário, quero ver todos os hotéis com possibilidade de filtrar por país.

**Acceptance Criteria:**
- [ ] `src/app/[locale]/hotels/page.tsx` (Server Component)
- [ ] `src/components/HotelsPageClient.tsx` (Client Component com filtro)
- [ ] `generateStaticParams` retorna pt + en
- [ ] `generateMetadata` localizado
- [ ] Filtro por país via `?country=slug` no URL
- [ ] Grid 2 colunas (md:3)
- [ ] Disclaimer de afiliados abaixo do título
- [ ] Estado vazio com mensagem quando sem resultados
- [ ] Typecheck passa

### US-006: Adicionar Hotels à Navbar, Footer e Sitemap
**Descrição:** Como usuário, quero navegar para a página de hotéis pela navbar e footer.

**Acceptance Criteria:**
- [ ] Link "Hotéis" na navbar desktop entre Tours e Glossário
- [ ] Link "Hotéis" no menu mobile
- [ ] Link "Hotéis" no footer
- [ ] `/pt/hotels` e `/en/hotels` adicionados ao sitemap.ts (priority 0.8)
- [ ] Typecheck passa

---

## Functional Requirements
- FR-1: `hotels-data.ts` com tipos Hotel, HotelLink, HotelType e funções utilitárias
- FR-2: Links Booking.com com parâmetro `?aid=YOUR_BOOKING_AID`
- FR-3: HotelCard exibe badge de tipo + plataforma + warning quando aplicável
- FR-4: HotelsSection integrada nas páginas de país (após ToursSection)
- FR-5: Página `/hotels` com filtro por país via URL searchParam
- FR-6: Hotéis editoriais (DE, PT, ES, MT) exibem nota sem botão de reserva
- FR-7: Navbar, Footer e Sitemap atualizados

## Non-Goals
- Não integrar API em tempo real do Booking.com (dados são curados manualmente)
- Não implementar sistema de avaliações ou comentários
- Não criar backend/CMS para gerenciar hotéis
- Não buscar fotos dos hotéis

## Technical Considerations
- Seguir exatamente o mesmo padrão da feature Tours (tours-data.ts → hotels-data.ts)
- Reuso de padrões de TourCard, ToursSection, ToursPageClient
- Booking.com affiliate URL: `https://www.booking.com/hotel/XX/slug.html?aid=YOUR_BOOKING_AID`
- `YOUR_BOOKING_AID` é placeholder — usuário substitui após cadastro no programa

## Success Metrics
- 10 países com conteúdo de hospedagem (hotel real ou editorial)
- Links de afiliado em todos os hotéis com Booking.com slug verificado
- Zero erros de TypeScript no build

## Open Questions
- Usuário ainda não tem AID do Booking.com — cadastrar em https://www.booking.com/affiliate-program/v2/index.html
- Confirmar situação atual da Tailândia (leis mudaram em 2025) antes do deploy
