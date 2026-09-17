import { ImageResponse } from "next/og";
import { org } from "@content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${org.name}. ${org.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0F4C5C",
          padding: "88px",
          color: "#F6F5F1",
        }}
      >
        <div style={{ fontSize: 34, color: "#F2A900", letterSpacing: -0.5 }}>
          {`${org.taxStatus} nonprofit`}
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -3,
            marginTop: 16,
            lineHeight: 1,
          }}
        >
          {org.name}
        </div>
        <div style={{ fontSize: 46, marginTop: 24, color: "#F2A900" }}>
          {org.tagline}
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 44,
            color: "rgba(246,245,241,0.78)",
            maxWidth: 900,
          }}
        >
          Computer labs for rural schools in India.
        </div>
      </div>
    ),
    size,
  );
}
