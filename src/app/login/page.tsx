"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login gagal!");
        return;
      }

      toast.success("Login berhasil 🎉");

      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      // 🔑 INI KUNCINYA
      window.dispatchEvent(new Event("auth-change"));

      router.push(data.role === "admin" ? "/admin" : "/user");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-96"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <LogIn className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Login Akun
          </h1>
          <p className="text-sm text-gray-500">
            Masuk ke dashboard Saku-Harga
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-2 rounded-lg transition"
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </motion.div>
    </main>
  );
}
