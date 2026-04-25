export default function DashboardLayout({
  sidebar,
  topbar,
  children,
  right,
}: {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      {sidebar}

      <div className="flex flex-1 flex-col">
        {topbar}

        <div className="grid flex-1 gap-6 p-6 lg:grid-cols-[1fr_340px]">
          <div>{children}</div>
          <div>{right}</div>
        </div>
      </div>
    </div>
  );
}