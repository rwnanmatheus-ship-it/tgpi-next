"use client";

import { useState } from "react";

export default function ResponsivePreview() {
  const [width, setWidth] = useState(390);
  const [route, setRoute] = useState("/");
  return <main style={{ padding: 16, background: "#dce1e8", color: "#061b33" }}><h1 style={{ fontSize: 24 }}>TGPI responsive verification</h1><div style={{ display: "flex", gap: 16, padding: "12px 0" }}><label>Viewport <select aria-label="Viewport" value={width} onChange={(event) => setWidth(Number(event.target.value))}>{[320, 375, 390, 430, 768, 1280, 1440].map((value) => <option key={value}>{value}</option>)}</select></label><label>Page <select aria-label="Page" value={route} onChange={(event) => setRoute(event.target.value)}>{["/", "/countries", "/countries/portugal", "/compare", "/courses", "/passport", "/pricing", "/sign-in", "/profile"].map((value) => <option key={value}>{value}</option>)}</select></label></div><div style={{ overflowX: "auto" }}><iframe title="TGPI responsive preview" src={route} style={{ display: "block", width, height: 850, marginInline: "auto", border: 0, background: "white" }} /></div></main>;
}
