const stats = [
  { title: "Países Explorados", value: "24", subtitle: "de 195 países" },
  { title: "Cursos em Andamento", value: "8", subtitle: "continue aprendendo" },
  { title: "Horas de Estudo", value: "184h", subtitle: "+12h esta semana" },
  { title: "Conquistas", value: "17", subtitle: "ver todas" },
  { title: "Sequência", value: "21 dias", subtitle: "mantenha o ritmo 🔥" },
];

export default function DashboardStats() {
  return (
    <section className="grid gap-4 md:grid-cols-5">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <p className="text-sm text-slate-400">{item.title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
          <p className="mt-1 text-xs text-yellow-400">{item.subtitle}</p>
        </div>
      ))}
    </section>
  );
}