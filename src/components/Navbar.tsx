"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const syncAuth = () => {
    setRole(localStorage.getItem("role"));
    setUsername(localStorage.getItem("username"));
  };

  useEffect(() => {
    syncAuth();
    const onAuthChange = () => syncAuth();
    window.addEventListener("auth-change", onAuthChange);
    return () => window.removeEventListener("auth-change", onAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };

  const dashboardHref =
    role === "admin"
      ? "/admin"
      : role === "user"
      ? "/user"
      : "/";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const navClass = (active: boolean) =>
    `relative px-1 transition
     after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-blue-400
     after:transition-all after:duration-300
     ${
       active
         ? "after:w-full text-blue-400"
         : "after:w-0 hover:after:w-full hover:text-blue-400"
     }`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        
        {/* LEFT — BRAND */}
        <Link
          href={dashboardHref}
          className="text-xl font-extrabold tracking-wide hover:text-blue-400 transition"
        >
          Saku-Harga
        </Link>

        {/* RIGHT — NAV + AUTH */}
        <div className="flex items-center gap-6 text-sm font-medium">
          
          {/* DASHBOARD */}
          <Link
            href={dashboardHref}
            className={navClass(isActive(dashboardHref))}
          >
            Dashboard
          </Link>

          {/* ABOUT */}
          <Link
            href="/about"
            className={navClass(isActive("/about"))}
          >
            Tentang Kami
          </Link>

          {/* AUTH */}
          {role ? (
            <div className="relative group ml-2">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-800 transition">
                {role === "admin" ? <ShieldCheck size={18} /> : <User size={18} />}
                <span className="font-medium">{username}</span>
              </button>

              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
