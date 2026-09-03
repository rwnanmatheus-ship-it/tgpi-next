"use client";

import { useRef, useState } from "react";

export default function ResponsivePreview() {
  const [width, setWidth] = useState(390);
  const [route, setRoute] = useState("/");
  const frame = useRef<HTMLIFrameElement>(null);
  const [report, setReport] = useState("");

  function inspectLayout() {
    try {
      const document = frame.current?.contentDocument;
      const view = frame.current?.contentWindow;
      if (!document || !view) { setReport("The page is not ready or cannot be inspected."); return; }
      const visible = (element: Element) => element.getClientRects().length > 0;
      const root = document.documentElement;
      setReport(JSON.stringify({
        path: view.location.pathname,
        viewport: view.innerWidth,
        contentWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        horizontalOverflow: root.scrollWidth > root.clientWidth + 1,
        visibleH1: [...document.querySelectorAll("h1")].filter(visible).map((element) => element.textContent),
        mobileHeader: [...document.querySelectorAll(".mobile-topbar")].some(visible),
        mobileDock: [...document.querySelectorAll(".mobile-dock")].some(visible),
        desktopHeader: [...document.querySelectorAll(".tgpi-legacy-navbar")].some(visible),
        brokenImages: [...document.images].filter((element) => visible(element) && element.complete && !element.naturalWidth).map((element) => element.alt),
        visibleInputs: [...document.querySelectorAll("input:not([type=hidden]),select,textarea")].filter(visible).map((element) => ({ label: element.getAttribute("aria-label") ?? element.getAttribute("placeholder") ?? element.id, font: view.getComputedStyle(element).fontSize })),
      }, null, 2));
    } catch {
      setReport("This page cannot be inspected from the preview frame.");
    }
  }

  return <main style={{ padding: 16, background: "#dce1e8", color: "#061b33" }}>
    <h1 style={{ fontSize: 24 }}>TGPI responsive verification</h1>
    <div style={{ display: "flex", gap: 16, padding: "12px 0", flexWrap: "wrap" }}>
      <label>Viewport <select aria-label="Viewport" value={width} onChange={(event) => { setWidth(Number(event.target.value)); setReport(""); }}>{[320, 375, 390, 430, 768, 1280, 1440].map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Page <select aria-label="Page" value={route} onChange={(event) => { setRoute(event.target.value); setReport(""); }}>{["/", "/countries", "/countries/portugal", "/countries/united-kingdom", "/countries/canada", "/countries/vatican-city", "/country-fit", "/intelligence", "/intelligence/research", "/compare", "/courses", "/passport", "/pricing", "/sign-in", "/profile"].map((value) => <option key={value}>{value}</option>)}</select></label>
      <button type="button" onClick={inspectLayout}>Inspect layout</button>
    </div>
    {report && <pre aria-label="Layout report" style={{ padding: 16, background: "white", overflowX: "auto", fontSize: 13 }}>{report}</pre>}
    <div style={{ overflowX: "auto" }}><iframe ref={frame} title="TGPI responsive preview" src={route} style={{ display: "block", width, height: 850, marginInline: "auto", border: 0, background: "white" }} /></div>
  </main>;
}
