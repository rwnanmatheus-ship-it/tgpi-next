"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", href: "/profile" },
  { name: "Mapa Mundial", href: "/countries" },
  { name: "Países", href: "/countries" },
  { name: "Cursos", href: "/courses" },
  { name: "Recursos", href: "/resources" },
  { name: "Comparador", href: "/compare" },
  { name: "IA Conselheira", href: "/ai" },
  { name: "Comunidade", href: "/community" },
  { name: "Certificados", href: "/certificate" },
];

export default function TGPISidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r border-white/10 p-4 bg-[#050b18]">
      <h1 className="text-yellow-400 font-bold text-lg mb-6">TGPI</h1>

      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-4 py-2 rounded-xl ${
              path === item.href
                ? "bg-yellow-500 text-black"
                : "hover:bg-white/5"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}