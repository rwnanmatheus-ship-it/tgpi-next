"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type AdminUser = {
  id: string;
  email: string;
  membershipPlan: string;
  subscriptionStatus?: string;
  xp?: number;
  level?: number;
};

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const snap = await getDocs(collection(db, "users"));

        const list: AdminUser[] = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email || "No email",
            membershipPlan: data.membershipPlan || "Free",
            subscriptionStatus: data.subscriptionStatus || "inactive",
            xp: data.xp || 0,
            level: data.level || 1,
          };
        });

        setUsers(list);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-4xl font-bold">Admin Dashboard</h1>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-4">Email</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">XP</th>
                  <th className="p-4">Level</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-white/10 hover:bg-white/5"
                  >
                    <td className="p-4">{user.email}</td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          user.membershipPlan === "Premium"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-white/10 text-slate-300"
                        }`}
                      >
                        {user.membershipPlan}
                      </span>
                    </td>

                    <td className="p-4">{user.subscriptionStatus}</td>
                    <td className="p-4">{user.xp}</td>
                    <td className="p-4">{user.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}