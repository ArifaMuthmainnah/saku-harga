import { useState, useEffect } from "react";
import { ItemHarga } from "@/lib/useHarga";

interface Props {
  onSubmit: (data: Omit<ItemHarga, "id" | "updatedAt">) => void;
  initialData?: ItemHarga;
}

export default function PriceForm({ onSubmit, initialData }: Props) {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState<"pokok" | "sayur" | "protein" | "lainnya">("pokok");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama);
      setKategori(initialData.kategori);
      setHarga(initialData.harga.toString());
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) {
      alert("Nama barang wajib diisi");
      return;
    }
    if (isNaN(Number(harga))) {
      alert("Harga harus berupa angka");
      return;
    }

    onSubmit({
      nama,
      kategori,
      harga: Number(harga),
    });

    setNama("");
    setKategori("pokok");
    setHarga("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        type="text"
        placeholder="Nama barang"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="border p-2 rounded w-full bg-gray-900"
      />
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value as any)}
        className="border p-2 rounded w-full bg-gray-900"
      >
        <option value="pokok">Pokok</option>
        <option value="sayur">Sayur</option>
        <option value="protein">Protein</option>
        <option value="lainnya">Lainnya</option>
      </select>
      <input
        type="text"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        className="border p-2 rounded w-full bg-gray-900"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
