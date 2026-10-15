import { ImageResponse } from "next/og"
import { site } from "@/lib/portfolio"

export const dynamic = "force-static"
export const alt = `${site.name}, software engineer`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#ffffff", color: "#0a0a0a", fontFamily: "monospace" }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#737373", textTransform: "uppercase" }}>{site.handle}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 300, lineHeight: 1.02, letterSpacing: -2 }}>
            <span>Maleek</span>
            <span style={{ color: "#737373" }}>Diyaolu</span>
          </div>
          <div style={{ display: "flex", fontSize: 36, lineHeight: 1.4, color: "#525252", maxWidth: 960 }}>{site.summary}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#737373", borderTop: "2px solid #e5e5e5", paddingTop: 28 }}>
          <span>{site.url.replace("https://", "")}</span>
          <span>{site.location}</span>
        </div>
      </div>
    ),
    size,
  )
}
