"use client";

import { useState, useEffect } from "react";
import { useHarga } from "@/lib/useHarga";
import SearchBar from "@/components/SearchBar";
import PriceTable from "@/components/PriceTable";
import AuthGuard from "@/components/AuthGuard";
import HargaHistogram from "@/components/HargaHistogram";

const PROVINSI = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Barat Daya",
  "Papua Selatan",
  "Papua Tengah",
  "Papua Pegunungan",
];

export default function UserPage() {
  const { hargaList, fetchHarga, loading } = useHarga();
  const [query, setQuery] = useState("");
  const [wilayah, setWilayah] = useState("Semua");
  const [kategori, setKategori] = useState("Semua");

  // Filter wilayah: ambil data dari API
  useEffect(() => {
    if (wilayah === "Semua") fetchHarga();
    else fetchHarga(wilayah);
  }, [wilayah]);

  // Filter search + kategori di frontend
  const filtered = hargaList
    .filter((item) =>
      item.nama.toLowerCase().includes(query.toLowerCase())
    )
    .filter((item) =>
      kategori === "Semua" ? true : item.kategori === kategori
    );

  return (
    <AuthGuard allow={["user", "admin"]}>
      <main className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Harga Barang
        </h1>

        {/* FILTER */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-black space-y-4">
          <div>
            <label className="block mb-2 font-semibold">
              Filter Wilayah
            </label>
            <select
              value={wilayah}
              onChange={(e) => setWilayah(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="Semua">Semua Provinsi</option>
              {PROVINSI.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Filter Kategori
            </label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="pokok">Pokok</option>
              <option value="sayur">Sayur</option>
              <option value="protein">Protein</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <SearchBar value={query} onChange={setQuery} />
        </div>

        {/* HISTOGRAM */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">
            Histogram Harga Pangan
          </h2>

          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <HargaHistogram
              data={filtered}
              wilayah={wilayah}
              kategori={kategori}
            />
          )}
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <PriceTable data={filtered} />
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
