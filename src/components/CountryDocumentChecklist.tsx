import type { CountryChecklist } from "@/lib/country-document-checklists";

type CountryDocumentChecklistProps = {
  checklist: CountryChecklist;
};

const categoryLabels: Record<string, string> = {
  identity: "Identity",
  travel: "Travel",
  study: "Study",
  work: "Work",
  housing: "Housing",
  finance: "Finance",
};

export default function CountryDocumentChecklist({
  checklist,
}: CountryDocumentChecklistProps) {
  const grouped = checklist.items.reduce<Record<string, typeof checklist.items>>(
    (acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {}
  );

  return (
    <section className="mb-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
      <div className="mb-6">
        <h2 className="mb-2 text-3xl font-bold text-yellow-400">
          Document Checklist
        </h2>
        <p className="max-w-3xl text-slate-300">{checklist.description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(grouped).map(([category, items]) => (
          <div
            key={category}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-yellow-400">
              {categoryLabels[category] || category}
            </h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-6 text-slate-200">
                      {item.label}
                    </p>
                    {item.required ? (
                      <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-300">
                        Required
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}