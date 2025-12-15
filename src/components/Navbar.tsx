"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  // 🔥 FIX: update role setiap path berubah
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4 shadow">
      {/* Judul */}
      <div className="font-bold text-xl">
        {role === "admin"
          ? "Dashboard Admin"
          : role === "user"
          ? "Dashboard User"
          : "Saku-Harga"}
      </div>

      {/* Menu */}
      <div className="flex space-x-4 items-center">
        {role === "admin" && (
          <>
            <Link href="/admin">Dashboard Admin</Link>
            <Link href="/about">Tentang Kami</Link>
          </>
        )}

        {role === "user" && (
          <>
            <Link href="/user">Dashboard User</Link>
            <Link href="/about">Tentang Kami</Link>
          </>
        )}

        {!role && (
          <>
            <Link href="/">Dashboard</Link>
            <Link href="/about">Tentang Kami</Link>
            <Link href="/login">Login</Link>
          </>
        )}

        {role && (
          <div className="relative group">
            <button className="hover:text-yellow-400">Profil</button>
            <div className="absolute hidden group-hover:block bg-white text-black p-2 rounded shadow right-0">
              <p className="text-sm font-semibold capitalize">{role}</p>
              <button
                onClick={handleLogout}
                className="text-red-600 text-sm hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
