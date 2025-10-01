"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Saku-Harga
        </h1>
        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
          Aplikasi untuk memantau harga bahan pokok. Admin dapat menambahkan data,
          dan pengguna dapat mencari informasi harga dengan mudah.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3
                     bg-red-600 hover:bg-red-700 transition shadow-lg font-semibold"
        >
          Masuk Sekarang
        </button>
      </section>

      {/* Tentang Kami (optional untuk scroll dari Navbar nanti) */}
      <section id="about" className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-2">Tentang Kami</h2>
          <p className="text-gray-200">
            Saku-Harga berfokus memberi transparansi harga bahan pokok untuk masyarakat.
            Versi ini bersifat demo UTS (Front-End) dengan penyimpanan lokal.
          </p>
        </div>
      </section>
    </main>
  );
}
