"use client";

import { useState, useEffect } from "react";
import { useHarga } from "@/lib/useHarga";
import SearchBar from "@/components/SearchBar";
import PriceTable from "@/components/PriceTable";
import AuthGuard from "@/components/AuthGuard";
import HargaHistogram from "@/components/HargaHistogram";
import HargaInsight from "@/components/HargaInsight";

const PROVINSI = [
  "Aceh","Sumatera Utara","Sumatera Barat","Riau","Kepulauan Riau","Jambi",
  "Sumatera Selatan","Bengkulu","Lampung","Kepulauan Bangka Belitung",
  "DKI Jakarta","Jawa Barat","Jawa Tengah","DI Yogyakarta","Jawa Timur",
  "Banten","Bali","Nusa Tenggara Barat","Nusa Tenggara Timur",
  "Kalimantan Barat","Kalimantan Tengah","Kalimantan Selatan",
  "Kalimantan Timur","Kalimantan Utara","Sulawesi Utara","Gorontalo",
  "Sulawesi Tengah","Sulawesi Barat","Sulawesi Selatan","Sulawesi Tenggara",
  "Maluku","Maluku Utara","Papua","Papua Barat","Papua Barat Daya",
  "Papua Selatan","Papua Tengah","Papua Pegunungan",
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function UserPage() {
  const { hargaList, fetchHarga, loading } = useHarga();
  const [query, setQuery] = useState("");
  const [wilayah, setWilayah] = useState("Semua");
  const [kategori, setKategori] = useState("Semua");
  const [active, setActive] = useState("filter");

  useEffect(() => {
    wilayah === "Semua" ? fetchHarga() : fetchHarga(wilayah);
  }, [wilayah]);

  const filtered = hargaList
    .filter((item) => item.nama.toLowerCase().includes(query.toLowerCase()))
    .filter((item) => (kategori === "Semua" ? true : item.kategori === kategori));

  /* ===== ACTIVE SIDEBAR DETECTOR ===== */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <AuthGuard allow={["user", "admin"]}>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">

          {/* SIDEBAR */}
          <aside className="w-52 hidden md:block">
            <div className="sticky top-24 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-3 text-sm space-y-1">
              <p className="text-xs text-gray-400 mb-2">NAVIGASI</p>
              <button onClick={() => scrollTo("filter")} className={`sidebar-btn ${active==="filter" && "sidebar-active"}`}>Filter</button>
              <button onClick={() => scrollTo("insight")} className={`sidebar-btn ${active==="insight" && "sidebar-active"}`}>Insight</button>
              <button onClick={() => scrollTo("histogram")} className={`sidebar-btn ${active==="histogram" && "sidebar-active"}`}>Histogram</button>
              <button onClick={() => scrollTo("table")} className={`sidebar-btn ${active==="table" && "sidebar-active"}`}>Daftar Harga</button>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-center">Harga Barang</h1>

            <section id="filter" className="section-anchor bg-white p-6 rounded-lg shadow-md text-black space-y-4">
              <div>
                <label className="block mb-2 font-semibold">Filter Wilayah</label>
                <select value={wilayah} onChange={(e) => setWilayah(e.target.value)} className="border px-3 py-2 rounded w-full">
                  <option value="Semua">Semua Provinsi</option>
                  {PROVINSI.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Filter Kategori</label>
                <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="border px-3 py-2 rounded w-full">
                  <option value="Semua">Semua Kategori</option>
                  <option value="pokok">Pokok</option>
                  <option value="sayur">Sayur</option>
                  <option value="protein">Protein</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <SearchBar value={query} onChange={setQuery} />
            </section>

            <section
              id="insight"
              className="section-anchor bg-white p-6 rounded-lg shadow-md text-black"
            >
              <HargaInsight data={filtered} />
            </section>


            <section id="histogram" className="section-anchor bg-white p-6 rounded-lg shadow-md text-black">
              <h2 className="text-xl font-bold mb-4 text-center">
                Histogram Harga Pangan
              </h2>
              {loading ? <p>Loading chart...</p> : (
                <HargaHistogram data={filtered} wilayah={wilayah} kategori={kategori} />
              )}
            </section>

            <section id="table" className="section-anchor bg-white p-6 rounded-lg shadow-md text-black">
              {loading ? <p>Loading...</p> : <PriceTable data={filtered} />}
            </section>
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}
