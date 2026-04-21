import GlobalRoomsList from "@/components/GlobalRoomsList";
import UserCard from "@/components/UserCard";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 space-y-8">
      <h1 className="text-4xl text-yellow-400 font-bold">
        Global Community
      </h1>

      <GlobalRoomsList />

      <section className="grid md:grid-cols-3 gap-4">
        <UserCard name="Global Builder" />
        <UserCard name="Future Operator" />
        <UserCard name="Portugal Move" />
      </section>
    </main>
  );
}