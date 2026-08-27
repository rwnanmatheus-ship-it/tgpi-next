import { ImageResponse } from "next/og";

export const alt = "TGPI — Choose where to live, work or study with evidence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#041426",
          color: "#ffffff",
          display: "flex",
          fontFamily: "Georgia, serif",
          height: "100%",
          padding: 48,
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at 88% 16%, rgba(197,150,50,.34), transparent 28%), linear-gradient(135deg, #071a32, #102d50)",
            border: "1px solid rgba(240,213,140,.3)",
            borderRadius: 36,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            width: "100%",
          }}
        >
          <div style={{ color: "#f0d58c", display: "flex", fontSize: 24, letterSpacing: 8 }}>
            TGPI · THE GLOBAL POLYMATH INSTITUTE
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 950 }}>
            <div style={{ display: "flex", fontSize: 76, lineHeight: 0.98 }}>
              Choose where to live, work or study—with evidence.
            </div>
            <div style={{ color: "#d7e0eb", display: "flex", fontFamily: "Arial, sans-serif", fontSize: 26, marginTop: 28 }}>
              Country intelligence, transparent comparison, documents and practical learning in one connected system.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
