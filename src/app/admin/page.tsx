"use client";

import { useHarga } from "@/lib/useHarga";
import PriceForm from "@/components/PriceForm";
import PriceTable from "@/components/PriceTable";
import { useState } from "react";
import { ItemHarga } from "@/lib/useHarga";

export default function AdminPage() {
  const { hargaList, tambahHarga, updateHarga, hapusHarga } = useHarga();
  const [editing, setEditing] = useState<ItemHarga | null>(null);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Kelola Harga</h1>

      {/* Form Tambah / Edit */}
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

      {/* Tabel harga */}
      <PriceTable
        data={hargaList}
        onEdit={(item) => setEditing(item)}
        onDelete={(id) => hapusHarga(id)}
      />
    </main>
  );
}
