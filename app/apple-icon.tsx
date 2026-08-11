import { ImageResponse } from "next/og";
import { archivo, ICON_BG, ICON_INK } from "./brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon. iOS rounds the corners itself, so this stays square. */
export default async function AppleIcon() {
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
          /* Same cap-height correction as the 32px icon, scaled up. */
          paddingTop: 13,
          fontFamily: "Archivo",
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: -3,
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
