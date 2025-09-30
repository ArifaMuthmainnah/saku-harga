"use client";

import { useState } from "react";
import { useHarga } from "@/lib/useHarga";
import SearchBar from "@/components/SearchBar";
import PriceTable from "@/components/PriceTable";

export default function Page() {
  const { hargaList } = useHarga();
  const [query, setQuery] = useState("");

  // Filter nama barang
  const filtered = hargaList.filter((item) =>
    item.nama.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Harga Bahan Pokok</h1>
      <SearchBar value={query} onChange={setQuery} />
      <PriceTable data={filtered} />
    </main>
  );
}
