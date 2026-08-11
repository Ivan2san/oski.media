import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";
import { archivo } from "./brand";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0B0B0C";
const INK = "#F2F1ED";
const ACCENT = "#FFD100";

/** The share card: wordmark in its viewfinder brackets over the tagline. */
export default async function OpengraphImage() {
  const [regular, heavy] = await Promise.all([archivo(400), archivo(800)]);
  const corner = { position: "absolute" as const, width: 22, height: 22 };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          color: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Archivo",
        }}
      >
        {/* alignSelf keeps the brackets hugging the wordmark rather than
            stretching to the full card width. */}
        <div
          style={{
            display: "flex",
            position: "relative",
            alignSelf: "flex-start",
            padding: "16px 20px",
          }}
        >
          <div style={{ ...corner, left: 0, top: 0, borderLeft: `4px solid ${ACCENT}`, borderTop: `4px solid ${ACCENT}` }} />
          <div style={{ ...corner, right: 0, top: 0, borderRight: `4px solid ${ACCENT}`, borderTop: `4px solid ${ACCENT}` }} />
          <div style={{ ...corner, left: 0, bottom: 0, borderLeft: `4px solid ${ACCENT}`, borderBottom: `4px solid ${ACCENT}` }} />
          <div style={{ ...corner, right: 0, bottom: 0, borderRight: `4px solid ${ACCENT}`, borderBottom: `4px solid ${ACCENT}` }} />
          <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}>
            oski.media
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: -1.5,
              textTransform: "uppercase",
              maxWidth: 900,
            }}
          >
            {SITE.tagline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 28,
              fontSize: 25,
              fontWeight: 400,
              color: "rgba(242,241,237,0.6)",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, background: ACCENT }} />
            Sydney sports videographer · AFL · NRL · Football
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: heavy, weight: 800, style: "normal" },
      ],
    },
  );
}
