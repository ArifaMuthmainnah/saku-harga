"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* TENTANG APLIKASI */}
        <section className="space-y-3">
          <h1 className="text-3xl font-bold mb-4">Tentang Saku-Harga</h1>
          <p className="text-gray-300 leading-relaxed">
            <b>Saku-Harga</b> adalah aplikasi berbasis web yang dikembangkan untuk
            membantu pengguna dalam memantau harga bahan pangan di berbagai wilayah
            di Indonesia. Aplikasi ini menyediakan fitur pencarian dan pengelolaan
            data harga pangan secara terstruktur.
          </p>
        </section>

        {/* KONTEKS DATA */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold mb-2">Sumber & Pengelolaan Data</h2>
          <p className="text-gray-300 leading-relaxed">
            Data harga pangan pada aplikasi ini mengacu pada{" "}
            <a
              href="https://panelharga.badanpangan.go.id/beranda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Panel Harga Pangan Nasional (Badan Pangan Nasional)
            </a>
            . Namun, aplikasi ini belum menggunakan integrasi API secara langsung.
            Oleh karena itu, data dimasukkan secara manual oleh admin.
          </p>

          <p className="text-gray-300 mt-3 leading-relaxed">
            Untuk keperluan tugas Ujian Akhir Semester, data yang digunakan
            merupakan data contoh dengan periode pengambilan pada
            <b> 14–15 Desember 2025</b>, dengan satu data harga untuk setiap
            kategori komoditas dan wilayah.
          </p>
        </section>

        {/* TUJUAN */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold mb-2">Tujuan Pengembangan</h2>
          <p className="text-gray-300">
            Aplikasi ini dikembangkan sebagai bagian dari tugas akademik
            mata kuliah Praktikum Pemrograman Berorientasi Layanan (POPL),
            dengan tujuan menerapkan konsep pengembangan aplikasi web modern.
          </p>
        </section>

        {/* TIM */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold mb-6">Tim Pengembang</h2>
          <p className="text-gray-400 text-sm mb-4">
            Aplikasi ini dikembangkan oleh mahasiswa sebagai bagian dari tugas UAS.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TeamCard
              name="Arifa Muthmainnah"
              id="2308107010012"
              role="Full-Stack Developer"
              // photo="/team/arifa.jpg"
            />
            <TeamCard
              name="Nur Shadiqah"
              id="2308107010061"
              role="Full-Stack Developer"
              // photo="/team/diqa.jpg"
            />
          </div>
        </section>

      </div>
    </main>
  );
}

/* COMPONENT */
function TeamCard({
  name,
  id,
  role,
  photo,
}: {
  name: string;
  id: string;
  role: string;
  photo?: string;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition">
      
      {/* FOTO / INISIAL */}
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border border-gray-600"
        />
      ) : (
        <div
          className="w-20 h-20 mx-auto rounded-full bg-blue-600
                     flex items-center justify-center font-bold text-2xl mb-4"
        >
          {initial}
        </div>
      )}

      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{id}</p>
      <p className="text-sm text-blue-400 mt-1">{role}</p>
    </div>
  );
}