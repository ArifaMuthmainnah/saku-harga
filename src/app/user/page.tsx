// halaman atau page untuk user

"use client";

import { useState } from "react";
import { useHarga } from "@/lib/useHarga";
import SearchBar from "@/components/SearchBar";
import PriceTable from "@/components/PriceTable";

export default function UserPage() {
  const { hargaList } = useHarga();
  const [query, setQuery] = useState("");

  const filtered = hargaList.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-gray-00 via-gray-800 to-black text-white">
      <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">Harga Barang</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <PriceTable data={filtered} />
      </div>
    </main>
  );
}
