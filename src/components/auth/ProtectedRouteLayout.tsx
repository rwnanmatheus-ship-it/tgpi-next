import { requireUser } from "@/lib/auth/guards";

export default async function ProtectedRouteLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return children;
}
