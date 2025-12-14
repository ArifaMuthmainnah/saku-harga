import { useEffect, useState } from "react";

export type Kategori = "pokok" | "sayur" | "protein" | "lainnya";

export type ItemHarga = {
  id: number;          // ✅ DB int
  nama: string;
  kategori: Kategori;  // ✅ ada kategori
  harga: number;
  satuan: string;      // ✅ DB field
  wilayah: string;     // ✅ DB field
  updatedAt: string;   // ✅ DateTime -> string
};

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

type PayloadHarga = Omit<ItemHarga, "id" | "updatedAt">;

export function useHarga() {
  const [hargaList, setHargaList] = useState<ItemHarga[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ GET semua data (atau nanti bisa pakai wilayah kalau mau)
  const fetchHarga = async (wilayah?: string) => {
    setLoading(true);
    try {
      const url = wilayah
        ? `/api/harga?wilayah=${encodeURIComponent(wilayah)}`
        : `/api/harga`;

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Gagal mengambil data harga");

      setHargaList(data);
    } catch (err) {
      console.error("fetchHarga error:", err);
    } finally {
      setLoading(false);
    }
  };

  // load awal dari API
  useEffect(() => {
    fetchHarga();
  }, []);

  // ✅ POST tambah data
  const tambahHarga = async (item: PayloadHarga) => {
    const res = await fetch("/api/harga", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Gagal menambah harga");

    // cara aman: refresh
    await fetchHarga();
  };

  // ✅ PUT update data
  const updateHarga = async (id: number, item: PayloadHarga) => {
    const res = await fetch(`/api/harga/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Gagal mengupdate harga");

    await fetchHarga();
  };

  // ✅ DELETE hapus data
  const hapusHarga = async (id: number) => {
    const res = await fetch(`/api/harga/${id}`, { method: "DELETE" });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Gagal menghapus harga");

    await fetchHarga();
  };

  return { hargaList, loading, fetchHarga, tambahHarga, updateHarga, hapusHarga };
}
