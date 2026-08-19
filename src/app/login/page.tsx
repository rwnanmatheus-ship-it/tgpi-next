import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{ next?: string | string[] }>;
};

function safeNextPath(value: string | string[] | undefined) {
  const path = Array.isArray(value) ? value[0] : value;
  return path?.startsWith("/") && !path.startsWith("//") ? path : "/profile";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const destination = safeNextPath(next);
  redirect(`/sign-in?redirect_url=${encodeURIComponent(destination)}`);
}
