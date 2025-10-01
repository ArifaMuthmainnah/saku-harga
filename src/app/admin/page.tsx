"use client";
import AuthGuard from "@/components/AuthGuard";
import { useHarga } from "@/lib/useHarga";
import PriceForm from "@/components/PriceForm";
import PriceTable from "@/components/PriceTable";
import { useState } from "react";
import { ItemHarga } from "@/lib/useHarga";

export default function AdminPage() {
  const { hargaList, tambahHarga, updateHarga, hapusHarga } = useHarga();
  const [editing, setEditing] = useState<ItemHarga | null>(null);

  return (
    <AuthGuard allow={["admin"]}>
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Dashboard Admin - Kelola Harga
        </h1>

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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <PriceTable
            data={hargaList}
            onEdit={(item) => setEditing(item)}
            onDelete={(id) => hapusHarga(id)}
          />
        </div>
      </main>
    </AuthGuard>
  );
}
