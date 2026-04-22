import GlobalProfileForm from "@/components/GlobalProfileForm";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        Global Profile
      </h1>

      <GlobalProfileForm />
    </main>
  );
}