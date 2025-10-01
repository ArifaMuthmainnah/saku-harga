"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/user", label: "User" },
    { href: "/admin", label: "Admin" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:text-yellow-400 transition ${
                pathname === item.href ? "text-yellow-400 font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
