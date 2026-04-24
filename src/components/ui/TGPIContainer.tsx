export default function TGPIContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {children}
      </div>
    </div>
  );
}