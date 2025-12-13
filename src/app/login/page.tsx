"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Kirim request ke API login backend
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      // 2. Kalau gagal
      if (!res.ok) {
        alert(data.message || "Login gagal!");
        setLoading(false);
        return;
      }

      // 3. Kalau berhasil → simpan role dan redirect
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-white rounded-lg shadow-xl p-8 w-96">

        <h1 className="text-3xl md:text-3xl lg:text-4xl font-extrabold text-center mb-6 text-gray-900">
          LOGIN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}
