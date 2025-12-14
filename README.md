# Saku-Harga

Aplikasi web untuk memantau harga bahan pokok. Fokus **Front-End** dengan **Next.js + Tailwind CSS**.  
Backend **opsional** (UTS menekankan FE + design pattern + Docker).

---

## 📌 Latar Belakang
Harga bahan pokok di Indonesia sering berubah-ubah dan informasinya tersebar di berbagai sumber.  
Masyarakat umum sering kesulitan mendapatkan data harga yang cepat, sementara admin (pengelola) membutuhkan antarmuka sederhana untuk input dan memperbarui data.  

Saku-Harga hadir sebagai solusi ringkas untuk **mencari harga bahan pokok** dan memberikan **dashboard admin** untuk mengelola data.

---

## 🎯 Tujuan
- Memudahkan pengguna mencari harga bahan pokok dengan cepat dan praktis.
- Menyediakan antarmuka CRUD sederhana untuk admin (tambah, ubah, hapus).
- Menjadi dasar pengembangan ke sistem yang lebih besar dengan integrasi API resmi.

---

## 🌱 Manfaat
- **Masyarakat**: akses cepat informasi harga bahan pokok.
- **Pedagang kecil / UMKM**: bisa memantau harga dengan mudah.
- **Admin**: alur CRUD sederhana tanpa backend kompleks.
- **Pengembangan ke depan**: bisa dihubungkan dengan API data pangan nasional.

---

## 👥 Target Pengguna:
- **Masyarakat Indonesia (umum)**.
- **Pelaku UMKM / pedagang kecil**.
- **Admin internal (simulasi login)**.

---

## ✨ Fitur
- **User**:  
  - Cari barang secara real-time.  
  - Lihat daftar harga bahan pokok.  

- **Admin**:  
  - CRUD data barang (nama, kategori, harga).  
  - Validasi input (nama wajib, harga harus angka).  

- **Umum**:  
  - Role-based UI (login → user/admin).  
  - Persistensi data di `localStorage` (tetap ada meskipun refresh/logout).  

---

## 🛠️ Teknologi
- **Next.js (TypeScript)**
- **Tailwind CSS**
- **Design Pattern**:  
  - **Container–Presenter Pattern**  
  - **Hooks Pattern (custom hook useHarga)**  
  👉 Lihat dokumentasi di [`/docs/design-pattern.md`](./docs/design-pattern.md)

---

## 🚀 Cara Menjalankan (Lokal)
```bash
npm install
npm run dev
# buka http://localhost:3000

## Rencana Pengembangan
- Integrasi API harga pangan nasional.
- Filter harga berdasarkan wilayah.
- Sistem login admin berbasis database.
- Deployment skala penuh dengan Docker + CI/CD.

## Docker Hub
Image tersedia di Docker Hub:  
👉 [nshadiqah/saku-harga:v1-UTS](https://hub.docker.com/r/nshadiqah/saku-harga)
