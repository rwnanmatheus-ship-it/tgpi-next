import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const metadata = { title: "Country viewport validation", robots: { index: false, follow: false } };
export default async function CountryViewportQA({ searchParams }: { searchParams: Promise<{ view?: string; width?: string }> }) {
  if (process.env.VERCEL_ENV !== "preview") notFound();
  const query = await searchParams;
  const width = ["360", "390", "768", "1280"].includes(query.width || "") ? Number(query.width) : 390;
  const src = query.view === "portugal" ? "/countries/portugal" : "/countries";
  return <main style={{ padding: 16, background: "#dce4e9" }}><h1 style={{ fontSize: 18 }}>Viewport QA · {width}px</h1><iframe title="Country viewport preview" src={src} style={{ width, maxWidth: "100%", height: 820, border: "1px solid #aaa", background: "white" }} /></main>;
}
