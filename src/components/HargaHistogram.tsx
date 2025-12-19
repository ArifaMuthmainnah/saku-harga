"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { ItemHarga, formatRupiah } from "@/lib/useHarga";
import { useState } from "react";
import html2canvas from "html2canvas";

type Props = {
  data: ItemHarga[];
  wilayah: string;   // filter wilayah
  kategori: string;  // filter kategori
};

const COLOR_MAP: Record<string, string> = {
  pokok: "#3b82f6",
  sayur: "#22c55e",
  protein: "#ef4444",
  lainnya: "#eab308",
};

function aggregateNormal(data: ItemHarga[], sort: "asc" | "desc") {
  const map: Record<string, { total: number; count: number }> = {};

  data.forEach((item) => {
    const key = item.wilayah;
    if (!map[key]) map[key] = { total: 0, count: 0 };
    map[key].total += item.harga;
    map[key].count += 1;
  });

  const result = Object.entries(map).map(([wilayah, v]) => ({
    label: wilayah,
    hargaRata: Math.round(v.total / v.count),
  }));

  return result.sort((a, b) =>
    sort === "asc" ? a.hargaRata - b.hargaRata : b.hargaRata - a.hargaRata
  );
}

function aggregateStacked(data: ItemHarga[]) {
  const map: Record<string, any> = {};

  data.forEach((item) => {
    const key = item.wilayah;
    if (!map[key]) {
      map[key] = {
        label: key,
        pokok: 0,
        sayur: 0,
        protein: 0,
        lainnya: 0,
      };
    }
    map[key][item.kategori] += item.harga;
  });

  return Object.values(map);
}

export default function HargaHistogram({
  data,
  wilayah,
  kategori,
}: Props) {
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const isStacked =
    kategori === "Semua" &&
    (wilayah === "Semua" || wilayah !== "Semua");

  const chartData = isStacked
    ? aggregateStacked(data)
    : aggregateNormal(data, sort);

  const exportPNG = async () => {
    const el = document.getElementById("histogram");
    if (!el) return;

    const canvas = await html2canvas(el);
    const link = document.createElement("a");
    link.download = "histogram-harga.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (chartData.length === 0) {
    return <p className="text-center">Tidak ada data</p>;
  }

  return (
    <div>
      {/* Controls */}
      {!isStacked && (
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="space-x-2">
            <button
              onClick={() => setSort("desc")}
              className={`px-3 py-1 rounded ${
                sort === "desc"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Harga Tertinggi
            </button>
            <button
              onClick={() => setSort("asc")}
              className={`px-3 py-1 rounded ${
                sort === "asc"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Harga Terendah
            </button>
          </div>

          <button
            onClick={exportPNG}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Export PNG
          </button>
        </div>
      )}

      {/* Chart */}
      <div id="histogram" className="w-full h-[420px] bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 90 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              angle={-40}
              textAnchor="end"
              interval={0}
              height={100}
            />
            <YAxis tickFormatter={(v) => `Rp${v / 1000}k`} />
            <Tooltip formatter={(v: number) => formatRupiah(v)} />
            {isStacked ? (
              <>
                <Legend
                  verticalAlign="top"
                  align="center"
                  wrapperStyle={{ paddingBottom: 20 }}
                />
                <Bar dataKey="pokok" stackId="a" fill={COLOR_MAP.pokok} />
                <Bar dataKey="sayur" stackId="a" fill={COLOR_MAP.sayur} />
                <Bar dataKey="protein" stackId="a" fill={COLOR_MAP.protein} />
                <Bar dataKey="lainnya" stackId="a" fill={COLOR_MAP.lainnya} />
              </>
            ) : (
              <Bar
                dataKey="hargaRata"
                fill={COLOR_MAP[kategori] || "#2563eb"}
                radius={[6, 6, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
