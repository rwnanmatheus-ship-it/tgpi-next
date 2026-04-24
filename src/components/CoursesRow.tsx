export default function CoursesRow() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Continue aprendendo</h2>

      <div className="grid md:grid-cols-4 gap-4">
        {["Japão", "Portugal", "Inglês", "Árabe"].map((c) => (
          <div
            key={c}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500 cursor-pointer"
          >
            <p className="font-semibold">{c}</p>
            <div className="mt-2 h-2 bg-black rounded">
              <div className="h-2 bg-yellow-400 w-1/2 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}