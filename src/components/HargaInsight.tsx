"use client";

import { ItemHarga } from "@/lib/useHarga";

type Props = {
  data: ItemHarga[];
};

export default function HargaInsight({ data }: Props) {
  if (!data.length) return null;

  const total = data.length;

  const rataRata =
    data.reduce((sum, item) => sum + item.harga, 0) / total;

  const tertinggi = data.reduce((prev, curr) =>
    curr.harga > prev.harga ? curr : prev
  );

  const terendah = data.reduce((prev, curr) =>
    curr.harga < prev.harga ? curr : prev
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded shadow">
        <p className="text-sm text-gray-600">📈 Rata-rata Harga</p>
        <p className="text-lg font-bold">
          Rp {Math.round(rataRata).toLocaleString()}
        </p>
      </div>

      <div className="bg-red-100 p-4 rounded shadow">
        <p className="text-sm text-gray-600">🔺 Harga Tertinggi</p>
        <p className="font-semibold">{tertinggi.nama}</p>
        <p>Rp {tertinggi.harga.toLocaleString()}</p>
      </div>

      <div className="bg-blue-100 p-4 rounded shadow">
        <p className="text-sm text-gray-600">🔻 Harga Terendah</p>
        <p className="font-semibold">{terendah.nama}</p>
        <p>Rp {terendah.harga.toLocaleString()}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded shadow">
        <p className="text-sm text-gray-600">🧮 Total Data</p>
        <p className="text-lg font-bold">{total} barang</p>
      </div>
    </div>
  );
}
