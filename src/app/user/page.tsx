// halaman atau page untuk user

"use client";

import { useState } from "react";
import { useHarga } from "@/lib/useHarga";
import SearchBar from "@/components/SearchBar";
import PriceTable from "@/components/PriceTable";

export default function UserDashboard() {
  const { hargaList } = useHarga();
  const [query, setQuery] = useState("");

  // Filter barang sesuai pencarian
  const filtered = hargaList.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Dashboard User - Daftar Harga
      </h1>

      {/* Card Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Card Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <PriceTable data={filtered} />
      </div>
    </main>
  );
}
