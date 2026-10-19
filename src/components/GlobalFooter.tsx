import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";

const footerGroups = [
  { title: "Explore & decide", links: [
    ["Countries", "/countries"], ["Compare countries", "/compare"],
    ["Country Fit", "/country-fit"], ["Sources & methodology", "/authority"],
  ] },
  { title: "Learn & prepare", links: [
    ["Learning", "/courses"], ["Documents", "/passport"],
    ["Certificates", "/certificates"], ["Verify a credential", "/verify"],
  ] },
  { title: "Your TGPI", links: [
    ["Workspace", "/dashboard"], ["Global Key", "/global-key"],
    ["Profile & settings", "/profile"], ["Premium", "/premium"],
  ] },
  { title: "The institute", links: [
    ["About TGPI", "/about"], ["Resources", "/resources"],
    ["Community", "/community"], ["Company & legal", "/legal"],
  ] },
] as const;

const legalLinks = [
  ["Privacy", "/privacy"], ["Terms", "/terms"],
  ["Cookies", "/cookies"], ["Billing", "/billing-terms"],
  ["Refunds & cancellation", "/refunds"],
] as const;

const linkStyle = "inline-flex min-h-11 items-center rounded-md py-2 text-sm leading-5 text-[#C8D4E2] transition-colors hover:text-[#F1D796] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D796]";

export default function GlobalFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#C5A059]/30 bg-[#061522] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(197,160,89,0.09),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(42,100,155,0.13),transparent_55%)]" />
      <div className="tgpi-container py-8 sm:py-10 lg:py-12">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <Link href="/" aria-label="TGPI home" className="inline-flex max-w-full items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D796]">
              <BrandCrest width={1041} height={1274} sizes="56px" className="h-16 w-auto shrink-0 object-contain" />
              <span className="min-w-0">
                <span className="block text-2xl font-semibold tracking-[0.12em] text-white">TGPI</span>
                <span className="mt-1 block text-[11px] font-semibold leading-5 tracking-[0.08em] text-[#E5C887]">The Global Polymath Institute</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#B7C7D9]">Practical education and decision intelligence for a global life.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:w-[390px]">
            <Link href="/dashboard" className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-[#D4B36E]/35 bg-[linear-gradient(135deg,rgba(212,179,110,0.14),rgba(212,179,110,0.04))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-[#D4B36E]/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D796]">
              <span><span className="block text-sm font-semibold text-[#F1D796]">Your workspace</span><span className="mt-1 block text-xs leading-5 text-[#B7C7D9]">Keep your next steps connected</span></span><span aria-hidden="true">↗</span>
            </Link>
            <Link href="/countries" className="flex min-h-16 items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-white/35 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F1D796]">
              <span><span className="block text-sm font-semibold">Explore the world</span><span className="mt-1 block text-xs leading-5 text-[#B7C7D9]">Find where you fit</span></span><span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <nav aria-label="TGPI footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-7 py-8 md:grid-cols-4 lg:gap-x-10">
          {footerGroups.map(({ title, links }) => (
            <div key={title} className="min-w-0">
              <h2 className="mb-3 text-xs font-bold uppercase leading-5 tracking-[0.12em] text-[#E5C887]">{title}</h2>
              <ul>
                {links.map(([label, href]) => <li key={href}><Link href={href} prefetch={false} className={linkStyle}>{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-sm font-medium leading-6 text-[#DCE5EE]">Built in Brazil. Connected to the world.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a href="mailto:contact@theglobalpolymath.com" className={linkStyle}>Contact TGPI <span aria-hidden="true" className="ml-2">↗</span></a>
            <a href="https://www.instagram.com/theglobalpolymath/" target="_blank" rel="noopener noreferrer" className={linkStyle}>Instagram<span className="sr-only"> (opens in a new tab)</span><span aria-hidden="true" className="ml-2">↗</span></a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 text-xs leading-5 text-[#AABBD0]">
            <p>© {new Date().getFullYear()} TGPI — The Global Polymath Institute. All rights reserved.</p>
            <p className="mt-2 max-w-2xl">Educational information supports your research. Confirm requirements with official sources before making decisions.</p>
          </div>
          <nav aria-label="Legal policies" className="flex max-w-full flex-wrap gap-x-5 gap-y-1 lg:max-w-md lg:justify-end">
            {legalLinks.map(([label, href]) => <Link key={href} href={href} prefetch={false} className={`${linkStyle} text-xs`}>{label}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
