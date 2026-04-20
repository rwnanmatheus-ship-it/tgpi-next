import { getUserData } from "@/lib/user-data";

export default async function PublicProfile({ params }: any) {
  const user = await getUserData(params.uid);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-white">
      <h1 className="text-4xl font-bold">Global Profile</h1>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-lg">XP: {user.xp}</p>
        <p className="mt-2 text-lg">
          Countries explored: {user.countriesExplored}
        </p>
        <p className="mt-2 text-lg">
          Courses completed: {user.coursesCompleted}
        </p>
      </div>
    </div>
  );
}