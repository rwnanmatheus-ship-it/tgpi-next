"use client";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

export default function PlatformNotificationPanel({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">Notificações</h2>
          <p className="mt-2 text-sm text-slate-400">
            Atualizações da sua conta, da plataforma e do seu progresso.
          </p>
        </div>

        <span className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-200">
          {notifications.filter((item) => item.unread).length} novas
        </span>
      </div>

      <div className="space-y-3">
        {notifications.length ? (
          notifications.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-3 w-3 rounded-full ${
                    item.unread ? "bg-yellow-400" : "bg-slate-600"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                  <p className="mt-2 text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            Nenhuma notificação por enquanto.
          </div>
        )}
      </div>
    </section>
  );
}