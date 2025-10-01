"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Role = "admin" | "user";
export default function AuthGuard({
  allow,
  children,
}: {
  allow: Role[];
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    // belum login → ke /login
    if (!role) {
      router.replace("/login");
      return;
    }
    // login tapi bukan role yang diizinkan → arahkan ke dashboard sesuai role
    if (!allow.includes(role as Role)) {
      router.replace(role === "admin" ? "/admin" : "/user");
    }
  }, [router, allow]);

  return <>{children}</>;
}
