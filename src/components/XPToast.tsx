"use client";

export default function XPToast({ amount }: { amount: number }) {
  return (
    <div className="fixed bottom-10 right-10 bg-yellow-500 text-black px-6 py-3 rounded-xl shadow-xl animate-bounce">
      +{amount} XP 🚀
    </div>
  );
}