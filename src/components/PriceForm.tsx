import { useState, useEffect } from "react";
import { ItemHarga } from "@/lib/useHarga";

const PROVINSI = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Barat Daya",
  "Papua Selatan",
  "Papua Tengah",
  "Papua Pegunungan",
];

const SATUAN_OPTIONS = ["kg", "liter", "pcs", "gram", "ons", "ikat", "bungkus", "botol", "kaleng"];

interface Props {
  onSubmit: (data: Omit<ItemHarga, "id" | "updatedAt">) => void;
  initialData?: ItemHarga;
}

export default function PriceForm({ onSubmit, initialData }: Props) {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState<ItemHarga["kategori"]>("pokok");
  const [harga, setHarga] = useState<string>("");
  const [satuan, setSatuan] = useState<string>(SATUAN_OPTIONS[0]); // default "kg"
  const [wilayah, setWilayah] = useState<string>(PROVINSI[0]);     // default "Aceh"

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama);
      setKategori(initialData.kategori);
      setHarga(String(initialData.harga));
      setSatuan(initialData.satuan);
      setWilayah(initialData.wilayah);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) return alert("Nama barang wajib diisi");
    if (harga.trim() === "" || isNaN(Number(harga))) return alert("Harga harus berupa angka");

    onSubmit({
      nama,
      kategori,
      harga: Number(harga),
      satuan,
      wilayah,
    });

    // reset form setelah submit
    setNama("");
    setKategori("pokok");
    setHarga("");
    setSatuan(SATUAN_OPTIONS[0]);
    setWilayah(PROVINSI[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-black">
      {/* Nama */}
      <input
        type="text"
        placeholder="Nama barang"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Kategori */}
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value as ItemHarga["kategori"])}
        className="border p-2 rounded w-full"
      >
        <option value="pokok">Pokok</option>
        <option value="sayur">Sayur</option>
        <option value="protein">Protein</option>
        <option value="lainnya">Lainnya</option>
      </select>

      {/* Harga */}
      <input
        type="text"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Satuan (dropdown) */}
      <select
        value={satuan}
        onChange={(e) => setSatuan(e.target.value)}
        className="border p-2 rounded w-full"
        aria-label="Satuan (kg/ liter/ pcs/ ...)"
        title="Satuan (kg/ liter/ pcs/ ...)"
      >
        {SATUAN_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Wilayah (dropdown 38 provinsi) */}
      <select
        value={wilayah}
        onChange={(e) => setWilayah(e.target.value)}
        className="border p-2 rounded w-full"
        aria-label="Wilayah (Aceh/ Sumatera Utara/ ...)"
        title="Wilayah (Aceh/ Sumatera Utara/ ...)"
      >
        {PROVINSI.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {initialData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
