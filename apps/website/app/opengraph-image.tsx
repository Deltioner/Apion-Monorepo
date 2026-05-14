import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Apion — Technology solutions for growing businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E40AF 60%, #3B82F6 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="64" height="64" rx="14" fill="rgba(255,255,255,0.15)" />
            <g
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.95"
            >
              <line x1="32" y1="14" x2="14" y2="50" />
              <line x1="32" y1="14" x2="50" y2="50" />
              <line x1="20.5" y1="38" x2="43.5" y2="38" />
            </g>
            <g fill="white">
              <circle cx="14" cy="50" r="4" />
              <circle cx="50" cy="50" r="4" />
              <circle cx="32" cy="14" r="4.5" />
            </g>
          </svg>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>
            Apion
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: "85%",
            }}
          >
            Technology solutions for growing businesses
          </div>
          <div
            style={{
              fontSize: 24,
              opacity: 0.8,
              fontWeight: 500,
              letterSpacing: -0.2,
            }}
          >
            Websites · SaaS · Maintenance · From Amsterdam
          </div>
        </div>
      </div>
    ),
    size,
  );
}
