"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Register gagal");
        return;
      }

      toast.success("Register berhasil! Silakan login 🚀");
      router.push("/login");
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      
      {/* ✅ CARD DIBUNGKUS motion.div */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-96"
      >
        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <UserPlus className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Buat Akun Baru
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Daftar untuk mengakses aplikasi Saku-Harga
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900
            focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password (min. 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-900
            focus:ring-2 focus:ring-green-500 focus:outline-none"
            minLength={6}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60
            text-white font-bold py-2 rounded-lg transition"
          >
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </motion.div>
    </main>
  );
}
