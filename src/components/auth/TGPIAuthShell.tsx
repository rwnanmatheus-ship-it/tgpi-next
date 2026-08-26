import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";

type TGPIAuthShellProps = {
  children: React.ReactNode;
  mode: "sign-in" | "sign-up";
};

const benefits = [
  ["Explore", "Save countries and build a personal global shortlist."],
  ["Decide", "Connect comparisons, priorities and next actions."],
  ["Learn", "Carry progress, certificates and readiness in one identity."],
] as const;

export default function TGPIAuthShell({ children, mode }: TGPIAuthShellProps) {
  const isSignUp = mode === "sign-up";

  return (
    <main className="bg-[#F5F1E8] px-4 py-8 text-[#0B1F3A] sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[34px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_34px_100px_rgba(11,31,58,0.14)] lg:min-h-[760px] lg:grid-cols-[1.06fr_.94fr]">
        <section className="order-2 relative overflow-hidden bg-[#0B1F3A] p-8 text-white sm:p-12 lg:order-1 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#E5BF5A]/25" />
          <div className="pointer-events-none absolute -right-5 top-16 h-52 w-52 rounded-full border border-[#E5BF5A]/15" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(229,191,90,0.22),transparent_32%),linear-gradient(160deg,transparent_35%,rgba(255,255,255,0.035)_35%,transparent_64%)]" />

          <div className="relative flex h-full flex-col">
            <Link href="/" className="flex w-fit items-center gap-3" aria-label="TGPI home">
              <span className="relative h-14 w-12">
                <BrandCrest fill priority sizes="48px" className="object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.28)]" />
              </span>
              <span>
                <span className="block font-[var(--tgpi-font-display)] text-2xl font-bold tracking-[0.04em] text-white">TGPI</span>
                <span className="block text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C]">The Global Polymath Institute</span>
              </span>
            </Link>

            <div className="my-auto py-14">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#F0D58C]">TGPI Global Key</p>
              <h1 className="mt-5 max-w-2xl font-[var(--tgpi-font-display)] text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                One identity for your global journey.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#D7DFEA]">
                {isSignUp
                  ? "Create a private key to connect the countries you explore, the decisions you make and the knowledge you earn."
                  : "Continue from any country, device or stage of life without losing the context of your global plan."}
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {benefits.map(([title, description], index) => (
                  <article key={title} className="rounded-2xl border border-white/12 bg-white/[0.055] p-4 backdrop-blur-sm">
                    <span className="text-[10px] font-extrabold tracking-[0.18em] text-[#F0D58C]">0{index + 1}</span>
                    <h2 className="mt-3 font-[var(--tgpi-font-display)] text-xl font-semibold text-white">{title}</h2>
                    <p className="mt-2 text-xs leading-5 text-[#C7D0DC]">{description}</p>
                  </article>
                ))}
              </div>
            </div>

            <p className="text-xs leading-6 text-[#AEB9C8]">
              Your TGPI Global ID is public. Your credentials, sessions and private data never are.
            </p>
          </div>
        </section>

        <section className="order-1 flex items-center justify-center p-6 sm:p-10 lg:order-2 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="flex w-fit items-center gap-3" aria-label="TGPI home">
                <span className="relative h-12 w-11">
                  <BrandCrest fill priority sizes="44px" className="object-contain" />
                </span>
                <span className="font-[var(--tgpi-font-display)] text-2xl font-bold tracking-[0.04em]">TGPI</span>
              </Link>
              <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">TGPI Global Key</p>
            </div>
            {children}
            <div className="mt-7 border-t border-[#DED8CA] pt-5">
              <p className="text-xs leading-6 text-[#697386]">
                Protected by encrypted sessions, device controls and configurable multi-factor authentication. Identity documents are never used as passwords.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
