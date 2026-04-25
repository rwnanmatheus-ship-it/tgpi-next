export default function CoursesRow() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">Continue Learning</h2>

      <div className="grid gap-4 md:grid-cols-4">
        {["Japan", "Portugal", "English", "Arabic"].map((course) => (
          <div
            key={course}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-yellow-500"
          >
            <p className="font-semibold">{course}</p>
            <div className="mt-2 h-2 rounded bg-black">
              <div className="h-2 w-1/2 rounded bg-yellow-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}