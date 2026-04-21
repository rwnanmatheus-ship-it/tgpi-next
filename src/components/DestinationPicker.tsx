type DestinationPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const destinations = [
  "Canada",
  "Portugal",
  "United States",
  "Germany",
  "Japan",
  "Australia",
];

export default function DestinationPicker({
  value,
  onChange,
}: DestinationPickerProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-yellow-400">
        Choose Your Destination
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        Your destination is the anchor of your TGPI journey. It shapes your
        pathway, network, and identity.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => {
          const active = value === destination;

          return (
            <button
              key={destination}
              onClick={() => onChange(destination)}
              className={`rounded-2xl border p-5 text-left transition ${
                active
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-slate-800 bg-slate-950 hover:border-yellow-500"
              }`}
            >
              <p className="text-lg font-bold text-white">{destination}</p>
              <p className="mt-2 text-sm text-slate-400">
                Build readiness for {destination}.
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}