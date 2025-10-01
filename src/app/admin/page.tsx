"use client";

import { useHarga } from "@/lib/useHarga";
import PriceForm from "@/components/PriceForm";
import PriceTable from "@/components/PriceTable";
import { useState } from "react";
import { ItemHarga } from "@/lib/useHarga";

export default function AdminDashboard() {
  const { hargaList, tambahHarga, updateHarga, hapusHarga } = useHarga();
  const [editing, setEditing] = useState<ItemHarga | null>(null);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ⚙️ Dashboard Admin - Kelola Harga
      </h1>

      {/* Card untuk form tambah/edit */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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

      {/* Card untuk tabel harga */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <PriceTable
          data={hargaList}
          onEdit={(item) => setEditing(item)}
          onDelete={(id) => hapusHarga(id)}
        />
      </div>
    </main>
  );
}
