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
  
  // Ambil data dari localStorage saat pertama kali load
  useEffect(() => {
    const data = localStorage.getItem("hargaList");
    if (data) {
      setHargaList(JSON.parse(data));
    }
  }, []);

  // Simpan data ke localStorage tiap kali berubah
  useEffect(() => {
    localStorage.setItem("hargaList", JSON.stringify(hargaList));
  }, [hargaList]);

  // Tambah item
  const tambahHarga = (item: Omit<ItemHarga, "id" | "updatedAt">) => {
    const newItem: ItemHarga = {
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
      ...item,
    };
    setHargaList([...hargaList, newItem]);
  };

  // Update item
  const updateHarga = (id: string, newData: Partial<ItemHarga>) => {
    setHargaList(
      hargaList.map((item) =>
        item.id === id ? { ...item, ...newData, updatedAt: new Date().toISOString() } : item
      )
    );
  };

  // Hapus item
  const hapusHarga = (id: string) => {
    setHargaList(hargaList.filter((item) => item.id !== id));
  };

  return { hargaList, tambahHarga, updateHarga, hapusHarga };
}
