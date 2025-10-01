"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">📊 Saku-Harga</h1>
      <p className="mb-8 max-w-xl">
        Saku-Harga adalah aplikasi sederhana untuk memantau harga bahan pokok. 
        Admin dapat menambahkan data harga, dan User dapat mencari informasi 
        harga dengan mudah.
      </p>
      <button
        onClick={() => router.push("/login")}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
      >
        Masuk Sekarang
      </button>
    </main>
  );
}