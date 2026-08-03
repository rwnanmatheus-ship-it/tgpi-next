import { notFound } from "next/navigation";

/**
 * The previous Admin page queried the entire `users` collection directly from
 * the browser without a server-side role check. Keep the route unavailable
 * until the dedicated Admin authorization boundary and server data layer are
 * implemented.
 */
export default function AdminPage() {
  notFound();
}
