"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Show } from "@clerk/nextjs";
import { COUNTRY_DECISION_PRESETS } from "@/data/country-page-system";
import MobileIcon from "./MobileIcon";
import MobileMicroLesson from "./MobileMicroLesson";

const countries = [
  { name: "Portugal", slug: "portugal", detail: "Language · lifestyle · mobility", image: "/images/home/tgpi-portugal-country.webp", emoji: "🇵🇹" },
  { name: "Canada", slug: "canada", detail: "Education · career · preparation", image: "/images/home/tgpi-canada-country.webp", emoji: "🇨🇦" },
  { name: "United Kingdom", slug: "united-kingdom", detail: "Learning · culture · opportunity", image: "/images/home/tgpi-united-kingdom-country.webp", emoji: "🇬🇧" },
] as const;

export default function MobileHome() {
  const [intent, setIntent] = useState(COUNTRY_DECISION_PRESETS[0]);
  return <div className="tgpi-mobile mobile-home">
    <section className="mobile-home-hero" aria-labelledby="mobile-home-title">
      <Image src="/images/home/tgpi-home-global-knowledge-meridian-v1.webp" alt="TGPI global knowledge observatory" fill sizes="(max-width:767px) 100vw, 1px" className="mobile-hero-image" />
      <div className="mobile-hero-shade" />
      <div className="mobile-home-hero-content"><p className="mobile-eyebrow">EDUCATION FOR A GLOBAL LIFE</p><h1 id="mobile-home-title">Your next chapter.<br /><em>A world of possibilities.</em></h1><p>Explore the world. Understand your options. Build the skills to move forward.</p><a href="#mobile-start" className="mobile-primary-button">Find your starting point <MobileIcon name="arrow" /></a><span className="mobile-hero-note">195 countries. One connected journey.</span></div>
    </section>

    <section className="mobile-intent-section" id="mobile-start" aria-labelledby="mobile-intent-title"><div className="mobile-section-topline"><p className="mobile-eyebrow">START WITH YOUR GOAL</p><span className="mobile-step-marker">01 — EXPLORE</span></div><h2 id="mobile-intent-title">What comes next for you?</h2><div className="mobile-intent-grid" role="group" aria-label="Your international goal">{COUNTRY_DECISION_PRESETS.map((preset) => <button key={preset.id} type="button" aria-pressed={intent.id === preset.id} onClick={() => setIntent(preset)}>{preset.label}<span aria-hidden="true">{intent.id === preset.id ? "↗" : "+"}</span></button>)}</div><div className="mobile-intent-result" aria-live="polite"><div><span className="mobile-small">YOUR EXPLORATION LENS</span><strong>{intent.label}</strong><p>{intent.summary} These are research filters, not personal recommendations.</p></div><Link href={`/countries?intent=${intent.id}#country-explorer`} className="mobile-primary-button" prefetch={false}>Explore this goal <MobileIcon name="arrow" /></Link></div></section>

    <section className="mobile-destinations" aria-labelledby="mobile-destinations-title"><div className="mobile-section-topline"><div><p className="mobile-eyebrow">OPEN A COUNTRY DOSSIER</p><h2 id="mobile-destinations-title">See beyond the postcard.</h2></div></div><div className="mobile-country-rail" aria-label="Featured country profiles">{countries.map((country) => <Link href={`/countries/${country.slug}`} key={country.slug} className="mobile-country-tile" prefetch={false}><Image src={country.image} alt={`${country.name} country profile`} fill sizes="(max-width:767px) 76vw, 1px" /><span className="mobile-country-tile-shade" /><span className="mobile-country-tile-content"><span>{country.emoji} COUNTRY INTELLIGENCE</span><strong>{country.name}</strong><small>{country.detail}</small><span className="mobile-country-open">Open dossier <MobileIcon name="arrow" /></span></span></Link>)}</div><Link href="/countries" className="mobile-text-link">Explore all 195 profiles <MobileIcon name="arrow" /></Link></section>

    <section className="mobile-journey" aria-labelledby="mobile-journey-title"><p className="mobile-eyebrow">TURN CURIOSITY INTO A PLAN</p><h2 id="mobile-journey-title">Your next three moves.</h2><Link href="/compare"><span className="mobile-journey-number">01</span><span><strong>Compare your shortlist</strong><small>Put your options in the same frame.</small></span><MobileIcon name="compare" /></Link><Link href="/passport"><span className="mobile-journey-number">02</span><span><strong>Prepare your evidence</strong><small>Know what needs checking and why.</small></span><MobileIcon name="file" /></Link><Link href="/courses"><span className="mobile-journey-number">03</span><span><strong>Build real capability</strong><small>Practice for the moments that matter.</small></span><MobileIcon name="book" /></Link></section>

    <MobileMicroLesson />

    <section className="mobile-key-invitation" aria-labelledby="mobile-key-title"><MobileIcon name="key" width={32} height={32} /><p className="mobile-eyebrow">YOUR TGPI GLOBAL KEY</p><h2 id="mobile-key-title">Keep your next chapter connected.</h2><p>Your country research, preparation and learning belong in one place.</p><Show when="signed-out"><Link href="/sign-up" className="mobile-primary-button">Create your free Global Key <MobileIcon name="arrow" /></Link><Link href="/sign-in" className="mobile-text-link">Already a member? Sign in</Link></Show><Show when="signed-in"><Link href="/profile" className="mobile-primary-button">Open your workspace <MobileIcon name="arrow" /></Link></Show><Link href="/pricing" className="mobile-premium-link">Discover what Premium adds <MobileIcon name="chevron" /></Link></section>
  </div>;
}
