import { getTranslations } from "next-intl/server";
import { fetchCountryNews } from "@/lib/news";

interface Props {
  slug: string;
  locale: string;
}

export async function NewsSection({ slug, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "news" });
  const articles = await fetchCountryNews(slug);

  if (articles.length === 0) return null;

  return (
    <section
      style={{
        marginTop: "40px",
        paddingTop: "32px",
        borderTop: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#18271d",
          margin: "0 0 20px 0",
        }}
      >
        📰 {t("title")}
      </h2>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
        {articles.map((article) => {
          const date = new Date(article.publishedAt).toLocaleDateString(
            locale === "pt" ? "pt-BR" : "en-US",
            { year: "numeric", month: "short", day: "numeric" }
          );
          const excerpt = article.description
            ? article.description.slice(0, 150) + (article.description.length > 150 ? "…" : "")
            : null;

          return (
            <li
              key={article.url}
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                paddingBottom: "16px",
              }}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#18271d",
                  textDecoration: "none",
                  lineHeight: 1.4,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {article.title}
              </a>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(0,0,0,0.4)",
                  margin: "0 0 6px 0",
                }}
              >
                {article.source} · {date}
              </p>
              {excerpt && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(0,0,0,0.55)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {excerpt}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p
        style={{
          marginTop: "12px",
          fontSize: "11px",
          color: "rgba(0,0,0,0.35)",
          fontStyle: "italic",
        }}
      >
        {t("via")}
      </p>
    </section>
  );
}
