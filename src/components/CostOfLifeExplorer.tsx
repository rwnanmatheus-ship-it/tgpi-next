"use client";



import { useLocale as useFormattingLocale } from "@/components/localization/LocaleProvider";
import { LocalizedText } from "@/components/localization/LocaleProvider";
type CostItem = {
  label: string;
  amount: number;
};

type CostOfLifeExplorerProps = {
  countryName: string;
  baseCurrency: string;
  targetCurrency: string;
  rate: number | null;
  items: CostItem[];
};

function formatAmount(locale: import('@/lib/localization/config').Locale, value: number, currency: string) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

export default function CostOfLifeExplorer({
  countryName,
  baseCurrency,
  targetCurrency,
  rate,
  items,
}: CostOfLifeExplorerProps) {
  const { locale } = useFormattingLocale();
  return (
    <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
      <div className="mb-6">
        <h2 className="mb-2 text-3xl font-bold text-yellow-400"><LocalizedText text={"Cost of Life Snapshot"} /></h2>
        <p className="max-w-3xl text-slate-300"><LocalizedText text={"Explore reference prices in"} />{" "}{countryName}{" "}<LocalizedText text={"and compare them with your target currency to better understand everyday financial reality."} /></p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const converted = rate !== null ? item.amount * rate : null;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                <LocalizedText text={item.label} />
              </h3>

              <p className="mb-2 text-sm text-slate-400"><LocalizedText text={"Local price"} /></p>
              <p className="mb-4 text-lg font-semibold text-white">
                {formatAmount(locale, item.amount, baseCurrency)}
              </p>

              <p className="mb-2 text-sm text-slate-400"><LocalizedText text={"Converted value"} /></p>
              <p className="text-lg font-semibold text-yellow-300">
                {converted !== null
                  ? formatAmount(locale, converted, targetCurrency)
                  : <LocalizedText text={"— {value0}"} values={{value0: String(targetCurrency)}} />}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <h4 className="mb-2 font-semibold text-yellow-400"><LocalizedText text={"How to use this"} /></h4>
        <p className="text-sm leading-7 text-slate-300"><LocalizedText text={"These are reference values to help users understand local daily costs, compare affordability, and make smarter decisions about travel, relocation, study, and integration planning."} /></p>
      </div>
    </section>
  );
}