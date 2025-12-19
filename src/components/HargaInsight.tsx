"use client";

import { ItemHarga } from "@/lib/useHarga";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Database,
} from "lucide-react";

type Props = {
  data: ItemHarga[];
};

export default function HargaInsight({ data }: Props) {
  if (!data || data.length === 0) return null;

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* RATA-RATA */}
      <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-2 text-green-600">
          <TrendingUp size={20} />
          <p className="text-sm font-medium">Rata-rata Harga</p>
        </div>
        <p className="text-xl font-bold text-gray-900">
          Rp {Math.round(rataRata).toLocaleString("id-ID")}
        </p>
      </div>

      {/* TERTINGGI */}
      <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-2 text-red-600">
          <ArrowUpRight size={20} />
          <p className="text-sm font-medium">Harga Tertinggi</p>
        </div>
        <p className="font-semibold text-gray-900">
          {tertinggi.nama}
        </p>
        <p className="text-gray-700">
          Rp {tertinggi.harga.toLocaleString("id-ID")}
        </p>
      </div>

      {/* TERENDAH */}
      <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-2 text-blue-600">
          <ArrowDownRight size={20} />
          <p className="text-sm font-medium">Harga Terendah</p>
        </div>
        <p className="font-semibold text-gray-900">
          {terendah.nama}
        </p>
        <p className="text-gray-700">
          Rp {terendah.harga.toLocaleString("id-ID")}
        </p>
      </div>

      {/* TOTAL */}
      <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-2 text-yellow-600">
          <Database size={20} />
          <p className="text-sm font-medium">Total Data</p>
        </div>
        <p className="text-xl font-bold text-gray-900">
          {total} barang
        </p>
      </div>
    </div>
  );
}
