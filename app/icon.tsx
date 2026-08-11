import { ImageResponse } from "next/og";
import { archivo, ICON_BG, ICON_INK } from "./brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Browser tab favicon: OM, white on black, in the brand's display face. */
export default async function Icon() {
  const heavy = await archivo(800);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: ICON_BG,
          color: ICON_INK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          /* Centring the line box leaves the caps sitting high, because the
             box reserves descender space the letters O and M never use. */
          paddingTop: 1.5,
          fontFamily: "Archivo",
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: -0.6,
          lineHeight: 1,
        }}
      >
        OM
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: heavy, weight: 800, style: "normal" }],
    },
  );
}
