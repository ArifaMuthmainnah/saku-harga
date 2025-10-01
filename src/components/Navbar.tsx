"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Ambil role dari localStorage
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    router.push("/login");
  };

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/user", label: "User" },
    { href: "/admin", label: "Admin" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
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

      {/* Jika user login, tampilkan tombol Logout */}
      {role && (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
        >
          Logout
        </button>
      )}

    </nav>
  );
}
