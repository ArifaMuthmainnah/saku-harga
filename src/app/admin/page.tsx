"use client";

import { useState, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useHarga, ItemHarga } from "@/lib/useHarga";
import PriceForm from "@/components/PriceForm";
import PriceTable from "@/components/PriceTable";
import SearchBar from "@/components/SearchBar";
import HargaInsight from "@/components/HargaInsight";
import HargaHistogram from "@/components/HargaHistogram";

const PROVINSI = [
  "Aceh","Sumatera Utara","Sumatera Barat","Riau","Kepulauan Riau","Jambi",
  "Sumatera Selatan","Bengkulu","Lampung","Kepulauan Bangka Belitung",
  "DKI Jakarta","Jawa Barat","Jawa Tengah","DI Yogyakarta","Jawa Timur",
  "Banten","Bali","Nusa Tenggara Barat","Nusa Tenggara Timur",
  "Kalimantan Barat","Kalimantan Tengah","Kalimantan Selatan",
  "Kalimantan Timur","Kalimantan Utara","Sulawesi Utara","Gorontalo",
  "Sulawesi Tengah","Sulawesi Barat","Sulawesi Selatan","Sulawesi Tenggara",
  "Maluku","Maluku Utara","Papua","Papua Barat","Papua Barat Daya",
  "Papua Selatan","Papua Tengah","Papua Pegunungan",
];

export default function AdminPage() {
  const {
    hargaList,
    fetchHarga,
    tambahHarga,
    updateHarga,
    hapusHarga,
    loading,
  } = useHarga();

  const [editing, setEditing] = useState<ItemHarga | null>(null);
  const [query, setQuery] = useState("");
  const [wilayah, setWilayah] = useState("Semua");
  const [kategori, setKategori] = useState("Semua");

  // Fetch data berdasarkan wilayah (sama seperti user)
  useEffect(() => {
    if (wilayah === "Semua") fetchHarga();
    else fetchHarga(wilayah);
  }, [wilayah]);

  // Filter di frontend
  const filtered = hargaList
    .filter((item) =>
      item.nama.toLowerCase().includes(query.toLowerCase())
    )
    .filter((item) =>
      kategori === "Semua" ? true : item.kategori === kategori
    );

  return (
    <AuthGuard allow={["admin"]}>
      <main className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Dashboard Admin – Kelola Harga Pangan
        </h1>

        {/* FORM INPUT */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-black">
          <PriceForm
            onSubmit={(data) => {
              if (editing) {
                updateHarga(editing.id, data);
                setEditing(null);
              } else {
                tambahHarga(data);
              }
            }}
            initialData={editing || undefined}
          />
        </div>

        {/* FILTER & SEARCH */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-black space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Filter Wilayah</label>
            <select
              value={wilayah}
              onChange={(e) => setWilayah(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="Semua">Semua Provinsi</option>
              {PROVINSI.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Filter Kategori</label>
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

        {/* INSIGHT OTOMATIS */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-black">
          <HargaInsight data={filtered} />
        </div>

        {/* HISTOGRAM */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-black">
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
            <PriceTable
              data={filtered}
              onEdit={(item) => setEditing(item)}
              onDelete={(id) => hapusHarga(id)}
            />
          )}
        </div>
      </main>
    </AuthGuard>
  );
}
