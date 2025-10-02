# Design Pattern pada Proyek Saku-Harga

## 1. Container–Presenter Pattern
Pattern ini memisahkan antara **logic (Container)** dan **UI (Presenter)**.

- **Container** → mengatur state, data, dan logic aplikasi.
- **Presenter** → hanya menampilkan UI berdasarkan data yang diberikan.

### Implementasi
- **Container**: `useHarga.ts` (mengelola daftar harga, simpan ke localStorage).
- **Presenter**: 
  - `SearchBar.tsx` → input pencarian.
  - `PriceTable.tsx` → menampilkan tabel data.
  - `PriceForm.tsx` → form tambah/edit harga.

Dengan pola ini, logic tidak bercampur dengan tampilan sehingga lebih mudah diuji dan di-maintain.

---

## 2. Hooks Pattern
Hooks Pattern digunakan untuk mengenkapsulasi logic stateful dalam **custom hook**.

### Implementasi
File: `src/lib/useHarga.ts`
```ts
export function useHarga() {
  const [hargaList, setHargaList] = useState<ItemHarga[]>([]);
  // ambil & simpan data di localStorage
  // tambah, edit, hapus item harga
  return { hargaList, tambahHarga, updateHarga, hapusHarga };
}
