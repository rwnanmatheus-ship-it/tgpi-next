import Hero3D from "@/components/Hero3D";
import GlobalRoomsList from "@/components/GlobalRoomsList";
import SocialFeed from "@/components/SocialFeed";
import OnlineNow from "@/components/OnlineNow";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Hero3D />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <OnlineNow />

        <div className="mt-10">
          <GlobalRoomsList />
        </div>

        <div className="mt-10">
          <SocialFeed />
        </div>
      </section>
    </main>
  );
}