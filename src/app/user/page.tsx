"use client";
import AuthGuard from "@/components/AuthGuard";
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
    <AuthGuard allow={["user"]}>
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Dashboard User - Daftar Harga
        </h1>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <PriceTable data={filtered} />
        </div>
      </main>
    </AuthGuard>
  );
}
