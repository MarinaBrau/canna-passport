import { useTranslations } from "next-intl";

// Country dot data — position + metadata
const COUNTRIES = {
  legal: [
    { name: "Canadá",   cx: 162, cy: 116, r: 6.5, pulse: true,  delay: "0s" },
    { name: "Alemanha", cx: 358, cy: 88,  r: 6,   pulse: true,  delay: "0.4s" },
    { name: "Uruguai",  cx: 192, cy: 268, r: 5.5, pulse: true,  delay: "0.8s" },
    { name: "Malta",    cx: 380, cy: 118, r: 4,   pulse: false, delay: "0s" },
  ],
  decriminalized: [
    { name: "Holanda",       cx: 348, cy: 80,  r: 5.5, delay: "0.2s" },
    { name: "EUA",           cx: 148, cy: 140, r: 5.5, delay: "0.6s" },
    { name: "Espanha",       cx: 335, cy: 100, r: 5,   delay: "0s" },
    { name: "Portugal",      cx: 320, cy: 104, r: 4.5, delay: "0.4s" },
    { name: "México",        cx: 118, cy: 157, r: 4.5, delay: "0s" },
    { name: "Jamaica",       cx: 168, cy: 168, r: 4,   delay: "0s" },
    { name: "Colômbia",      cx: 162, cy: 200, r: 4,   delay: "0s" },
    { name: "África do Sul", cx: 362, cy: 270, r: 4.5, delay: "0s" },
  ],
  medicinal: [
    { name: "Israel",    cx: 420, cy: 132, r: 4.5, delay: "0s" },
    { name: "Tailândia", cx: 565, cy: 175, r: 4.5, delay: "0.3s" },
    { name: "Austrália", cx: 654, cy: 250, r: 5,   delay: "0.6s" },
  ],
};

// Status colors
const COLORS = {
  legal: { fill: "#00d97a", glow: "rgba(0, 217, 122, 0.75)", stroke: "#00ff8e" },
  decriminalized: { fill: "#f59e0b", glow: "rgba(245, 158, 11, 0.65)", stroke: "#fbbf24" },
  medicinal: { fill: "#60a5fa", glow: "rgba(96, 165, 250, 0.65)", stroke: "#93c5fd" },
};

interface TooltipProps {
  x: number;
  y: number;
  name: string;
  color: string;
}

function Tooltip({ x, y, name, color }: TooltipProps) {
  const tooltipWidth = Math.max(name.length * 7 + 20, 60);
  const tooltipHeight = 24;
  const tx = Math.min(Math.max(x - tooltipWidth / 2, 4), 800 - tooltipWidth - 4);
  const ty = y - 38;

  return (
    <g className="map-tooltip" style={{ pointerEvents: "none" }}>
      <rect
        x={tx}
        y={ty}
        width={tooltipWidth}
        height={tooltipHeight}
        rx={4}
        fill="rgba(4, 9, 10, 0.92)"
        stroke={color}
        strokeWidth="0.75"
      />
      <text
        x={tx + tooltipWidth / 2}
        y={ty + tooltipHeight / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#dff0e8"
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="0.3"
      >
        {name}
      </text>
    </g>
  );
}

export function MapPlaceholder() {
  const t = useTranslations("home.map");

  return (
    <>
      <style>{`
        .map-pulse-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: cp-ring-expand 3s ease-out infinite;
        }
        .map-pulse-ring-2 {
          transform-box: fill-box;
          transform-origin: center;
          animation: cp-ring-expand 3s ease-out 1.5s infinite;
        }
        .map-badge-dot { animation: cp-dot-blink 2s ease-in-out infinite; }

        /* Dot hover groups */
        .map-dot-group { cursor: pointer; }
        .map-dot-group .map-tooltip { opacity: 0; transition: opacity 0.18s ease; }
        .map-dot-group:hover .map-tooltip { opacity: 1; }
        .map-dot-group .map-dot-core {
          transition: r 0.15s ease, filter 0.15s ease;
        }
        .map-dot-group:hover .map-dot-core {
          filter: brightness(1.3) drop-shadow(0 0 6px var(--dot-glow));
        }
      `}</style>

      <section
        className="py-20 px-4"
        style={{ background: "var(--cp-bg-surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: "rgba(0, 217, 122, 0.6)" }}
            >
              Visão Global
            </p>
            <h2
              className="font-display font-bold mb-2"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                background: "linear-gradient(135deg, #dff0e8 0%, #00d97a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("title")}
            </h2>
            <p className="text-sm" style={{ color: "rgba(160, 200, 176, 0.55)" }}>
              {t("subtitle")}
            </p>
          </div>

          {/* Map card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "#081508",
              border: "1px solid rgba(0, 217, 122, 0.1)",
              boxShadow:
                "0 24px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(0, 217, 122, 0.07)",
              height: "clamp(280px, 44vw, 400px)",
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 360"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Mapa mundial mostrando status legal do cannabis por país"
            >
              <title>Mapa de destinos — status legal do cannabis</title>

              {/* Graticule lines */}
              {[100, 200, 300, 400, 500, 600, 700].map((x) => (
                <line key={`vl-${x}`} x1={x} y1={0} x2={x} y2={360}
                  stroke="rgba(0,217,122,0.045)" strokeWidth="0.5" />
              ))}
              {[60, 120, 180, 240, 300].map((y) => (
                <line key={`hl-${y}`} x1={0} y1={y} x2={800} y2={y}
                  stroke="rgba(0,217,122,0.045)" strokeWidth="0.5" />
              ))}
              {/* Equator */}
              <line x1={0} y1={195} x2={800} y2={195}
                stroke="rgba(0,217,122,0.12)" strokeWidth="1" strokeDasharray="5 8" />

              {/* ── Continent shapes ── */}
              {/* North America */}
              <polygon
                points="55,72 98,56 152,52 204,58 232,70 242,90 246,132 228,168 196,178 160,180 136,166 94,152 58,134 44,106"
                fill="#0d2412" stroke="rgba(0,217,122,0.16)" strokeWidth="0.75"
              />
              {/* South America */}
              <polygon
                points="146,178 202,174 222,186 236,240 228,284 198,300 164,280 144,250 138,214"
                fill="#0d2412" stroke="rgba(0,217,122,0.16)" strokeWidth="0.75"
              />
              {/* Europe */}
              <polygon
                points="314,64 346,56 368,58 388,64 400,78 406,96 398,114 380,124 356,128 334,112 314,96 306,80"
                fill="#0d2412" stroke="rgba(0,217,122,0.16)" strokeWidth="0.75"
              />
              {/* Africa */}
              <polygon
                points="308,126 364,118 410,122 422,136 424,174 418,222 406,262 384,284 352,290 320,272 304,232 298,186 302,150"
                fill="#0d2412" stroke="rgba(0,217,122,0.16)" strokeWidth="0.75"
              />
              {/* Asia */}
              <polygon
                points="400,54 458,44 528,40 600,42 658,48 718,58 748,78 755,102 748,136 724,160 694,174 660,182 608,188 555,190 498,184 454,170 412,156 394,136 384,108 390,78"
                fill="#0d2412" stroke="rgba(0,217,122,0.16)" strokeWidth="0.75"
              />
              {/* Australia */}
              <polygon
                points="548,212 606,200 654,196 694,204 714,228 718,264 696,282 656,288 612,278 570,262 544,238 542,220"
                fill="#0d2412" stroke="rgba(0,217,122,0.16)" strokeWidth="0.75"
              />

              {/* ── LEGAL dots (green + pulse) ── */}
              {COUNTRIES.legal.map((c) => (
                <g
                  key={c.name}
                  className="map-dot-group"
                  style={{ "--dot-glow": COLORS.legal.glow } as React.CSSProperties}
                  role="img"
                  aria-label={`${c.name} — Cannabis legal`}
                >
                  {c.pulse && (
                    <>
                      <circle className="map-pulse-ring" cx={c.cx} cy={c.cy} r={c.r}
                        fill="none" stroke={COLORS.legal.stroke} strokeWidth="1.5" opacity={0.65} />
                      <circle className="map-pulse-ring-2" cx={c.cx} cy={c.cy} r={c.r}
                        fill="none" stroke={COLORS.legal.stroke} strokeWidth="1.5" opacity={0.65} />
                    </>
                  )}
                  <circle
                    className="map-dot-core"
                    cx={c.cx} cy={c.cy} r={c.r}
                    fill={COLORS.legal.fill}
                    style={{ filter: `drop-shadow(0 0 5px ${COLORS.legal.glow})` }}
                  />
                  <Tooltip x={c.cx} y={c.cy} name={c.name} color={COLORS.legal.fill} />
                </g>
              ))}

              {/* ── DECRIMINALIZED dots (amber) ── */}
              {COUNTRIES.decriminalized.map((c) => (
                <g
                  key={c.name}
                  className="map-dot-group"
                  style={{ "--dot-glow": COLORS.decriminalized.glow } as React.CSSProperties}
                  role="img"
                  aria-label={`${c.name} — Descriminalizado`}
                >
                  <circle
                    className="map-dot-core"
                    cx={c.cx} cy={c.cy} r={c.r}
                    fill={COLORS.decriminalized.fill}
                    style={{ filter: `drop-shadow(0 0 4px ${COLORS.decriminalized.glow})` }}
                    opacity={0.92}
                  />
                  <Tooltip x={c.cx} y={c.cy} name={c.name} color={COLORS.decriminalized.fill} />
                </g>
              ))}

              {/* ── MEDICINAL dots (blue) ── */}
              {COUNTRIES.medicinal.map((c) => (
                <g
                  key={c.name}
                  className="map-dot-group"
                  style={{ "--dot-glow": COLORS.medicinal.glow } as React.CSSProperties}
                  role="img"
                  aria-label={`${c.name} — Medicinal`}
                >
                  <circle
                    className="map-dot-core"
                    cx={c.cx} cy={c.cy} r={c.r}
                    fill={COLORS.medicinal.fill}
                    style={{ filter: `drop-shadow(0 0 4px ${COLORS.medicinal.glow})` }}
                    opacity={0.92}
                  />
                  <Tooltip x={c.cx} y={c.cy} name={c.name} color={COLORS.medicinal.fill} />
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div
              className="absolute bottom-4 left-4 flex flex-col gap-2 p-3 rounded-xl text-xs"
              style={{
                background: "rgba(4, 9, 10, 0.90)",
                border: "1px solid rgba(0, 217, 122, 0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              {[
                { color: COLORS.legal.fill,         glow: COLORS.legal.glow,         label: "Legal", icon: "✅" },
                { color: COLORS.decriminalized.fill, glow: COLORS.decriminalized.glow, label: "Descriminalizado", icon: "⚠️" },
                { color: COLORS.medicinal.fill,      glow: COLORS.medicinal.glow,      label: "Medicinal", icon: "💊" },
              ].map(({ color, glow, label, icon }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: color, boxShadow: `0 0 7px ${glow}` }}
                  />
                  <span style={{ color: "rgba(180, 218, 196, 0.72)" }}>
                    <span className="mr-1 text-[10px]">{icon}</span>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Coming soon chip */}
            <div
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{
                background: "rgba(0, 217, 122, 0.08)",
                border: "1px solid rgba(0, 217, 122, 0.18)",
                color: "#00d97a",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full map-badge-dot" style={{ background: "#00d97a" }} />
              Mapa interativo em breve
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
