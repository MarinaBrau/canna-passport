export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "NEWS_API_KEY não encontrada no ambiente" });
  }

  const url = `https://newsapi.org/v2/everything?q=cannabis+Netherlands&language=en&pageSize=3&sortBy=publishedAt&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  return Response.json({
    keyPresent: true,
    keyPrefix: apiKey.slice(0, 6) + "...",
    newsApiStatus: data.status,
    newsApiCode: data.code ?? null,
    newsApiMessage: data.message ?? null,
    totalResults: data.totalResults ?? 0,
  });
}
