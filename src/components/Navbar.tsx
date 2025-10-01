"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4 shadow">
      {/* Judul Kiri */}
      <div className="font-bold text-xl">
        {role === "admin"
          ? "Dashboard Admin"
          : role === "user"
          ? "Dashboard User"
          : "Saku-Harga"}
      </div>

      {/* Menu Kanan */}
      <div className="flex space-x-4">
        {role === "admin" ? (
          <>
            <Link href="/admin">Dashboard Admin</Link>
            <Link href="/about">Tentang Kami</Link>
            <div className="relative group">
              <button className="hover:text-yellow-400">Profil</button>
              <div className="absolute hidden group-hover:block bg-white text-black p-2 rounded shadow right-0">
                <p className="text-sm font-semibold">Admin</p>
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-sm hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : role === "user" ? (
          <>
            <Link href="/user">Dashboard User</Link>
            <Link href="/about">Tentang Kami</Link>
            <div className="relative group">
              <button className="hover:text-yellow-400">Profil</button>
              <div className="absolute hidden group-hover:block bg-white text-black p-2 rounded shadow right-0">
                <p className="text-sm font-semibold">User</p>
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-sm hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link href="/">Dashboard</Link>
            <Link href="/about">Tentang Kami</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
