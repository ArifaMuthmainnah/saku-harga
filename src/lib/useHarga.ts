import { useState, useEffect } from "react";

export type ItemHarga = {
  id: string;
  nama: string;
  kategori: "pokok" | "sayur" | "protein" | "lainnya";
  harga: number;
  updatedAt: string;
};

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

export function useHarga() {
  const [hargaList, setHargaList] = useState<ItemHarga[]>([]);

  // Load data awal dari localStorage
  useEffect(() => {
  if (hargaList.length === 0) {
    const saved = localStorage.getItem("hargaList");
    if (saved) {
      try {
        setHargaList(JSON.parse(saved));
      } catch (err) {
        console.error("Parsing localStorage error:", err);
      }
    }
  }
}, []); 

  // Simpan otomatis ke localStorage tiap kali hargaList berubah
  useEffect(() => {
    if (hargaList.length > 0) {
      localStorage.setItem("hargaList", JSON.stringify(hargaList));
    }
  }, [hargaList]);

  // Tambah item
  const tambahHarga = (item: Omit<ItemHarga, "id" | "updatedAt">) => {
    const newItem: ItemHarga = {
      ...item,
      id: crypto.randomUUID(),
      updatedAt: new Date().toLocaleDateString(),
    };
    setHargaList((prev) => [...prev, newItem]);
  };

  // Update item
  const updateHarga = (id: string, item: Omit<ItemHarga, "id" | "updatedAt">) => {
    setHargaList((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, ...item, updatedAt: new Date().toLocaleDateString() } : h
      )
    );
  };

  // Hapus item
  const hapusHarga = (id: string) => {
    setHargaList((prev) => prev.filter((h) => h.id !== id));
  };

  return { hargaList, tambahHarga, updateHarga, hapusHarga };
}
