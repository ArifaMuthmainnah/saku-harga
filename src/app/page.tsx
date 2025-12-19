"use client";

import { useRouter } from "next/navigation";
import { BarChart3, MapPin, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Pantau Harga Pangan <span className="text-blue-400">Secara Terpusat & Informatif</span>
        </h1>

        <p className="mt-5 text-gray-300 max-w-2xl mx-auto">
          <b>Saku-Harga</b> adalah aplikasi berbasis web untuk memantau harga bahan pangan
          di berbagai provinsi di Indonesia berdasarkan data resmi pemerintah.
        </p>

        <p className="mt-2 text-xs text-gray-400">
          Data contoh · Periode 14–15 Desember 2025 · Input manual oleh admin
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-10 inline-flex items-center justify-center rounded-lg px-7 py-3
                     bg-blue-600 hover:bg-blue-700 transition shadow-lg font-semibold"
        >
          Masuk ke Aplikasi
        </button>
      </section>

      {/* FITUR */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <FeatureCard
            icon={<BarChart3 size={28} />}
            title="Harga Harian"
            desc="Pantau perubahan harga bahan pangan secara berkala dan terstruktur."
          />

          <FeatureCard
            icon={<MapPin size={28} />}
            title="Berdasarkan Provinsi"
            desc="Data harga disajikan berdasarkan wilayah provinsi di Indonesia."
          />

          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Data Resmi"
            desc="Sumber data berasal dari Panel Harga Pangan Nasional."
          />

        </div>
      </section>

      {/* SUMBER DATA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold mb-2">Sumber Data</h2>
          <p className="text-gray-300 text-sm">
            Data harga pangan diperoleh dari{" "}
            <a
              href="https://panelharga.badanpangan.go.id/beranda"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              Panel Harga Pangan Badan Pangan Nasional (Bapanas)
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

/* COMPONENT */
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
      <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6
                      hover:border-blue-500 hover:-translate-y-1 transition-all">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{desc}</p>
    </div>
  );
}
