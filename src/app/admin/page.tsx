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
      <main className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
          Kelola Barang
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
