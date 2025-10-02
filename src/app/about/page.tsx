"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="bg-gray-800/90 text-white p-6 rounded-lg shadow-lg max-w-lg text-center backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
        <p className="mb-6">
          Saku-Harga adalah aplikasi sederhana untuk memantau harga bahan pokok. 
          Admin dapat menambahkan, mengubah, dan menghapus data harga. 
          Pengguna bisa mencari informasi harga dengan mudah.
        </p>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    </main>
  );
}
