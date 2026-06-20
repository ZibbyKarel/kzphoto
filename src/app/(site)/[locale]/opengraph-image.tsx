import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tf = await getTranslations({ locale, namespace: "footer" });
  const tm = await getTranslations({ locale, namespace: "meta" });

  const logo = await fetch(new URL("./logo-mark.png", import.meta.url)).then((r) =>
    r.arrayBuffer(),
  );
  const logoSrc = `data:image/png;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        backgroundColor: "#0e0d0b",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      {/* Decorative accent line */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "4px",
          height: "100%",
          backgroundColor: "#c2724e",
        }}
      />

      {/* Logo mark, top-right */}
      <img
        src={logoSrc}
        width={150}
        height={150}
        alt=""
        style={{ position: "absolute", top: "64px", right: "72px" }}
      />

      {/* Location badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#c2724e",
            marginRight: "10px",
          }}
        />
        <span
          style={{
            color: "#c2724e",
            fontSize: "16px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          {tf("location")}
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          color: "#f5f1eb",
          fontSize: "64px",
          fontWeight: "700",
          lineHeight: "1.1",
          fontFamily: "serif",
          marginBottom: "16px",
        }}
      >
        {site.name}
      </div>

      {/* Tagline */}
      <div
        style={{
          color: "#a09488",
          fontSize: "28px",
          fontFamily: "sans-serif",
          fontWeight: "400",
        }}
      >
        {tm("ogTagline")}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
