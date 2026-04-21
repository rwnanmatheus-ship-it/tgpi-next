export default function Hero3D() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#090B10] via-[#111827] to-black" />

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl font-bold text-white leading-tight">
          Build Your Global Identity
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Prepare, connect and move across countries with clarity and strategy.
        </p>

        <button className="mt-8 bg-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">
          Start Now
        </button>
      </div>
    </section>
  );
}