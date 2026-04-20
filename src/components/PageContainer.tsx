"use client";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageContainer({ title, subtitle, children }: Props) {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* HEADER PADRÃO */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* CONTEÚDO */}
        <div className="space-y-10">
          {children}
        </div>

      </div>
    </main>
  );
}