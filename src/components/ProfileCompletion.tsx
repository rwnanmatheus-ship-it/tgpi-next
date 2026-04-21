export default function ProfileCompletion() {
  const progress = 65;

  return (
    <div className="rounded-2xl border border-slate-800 p-5 bg-slate-900">
      <h3 className="text-yellow-400 font-bold">
        Profile Completion
      </h3>

      <div className="mt-4 h-2 bg-slate-700 rounded-full">
        <div
          className="h-2 bg-yellow-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-slate-300 mt-2">
        {progress}% complete
      </p>
    </div>
  );
}