import { ItemHarga, formatRupiah } from "@/lib/useHarga";

interface Props {
  data: ItemHarga[];
  onEdit?: (item: ItemHarga) => void;
  onDelete?: (id: string) => void;
}

export default function PriceTable({ data, onEdit, onDelete }: Props) {
  if (data.length === 0) {
    return <p className="text-gray-500">Tidak ada data harga.</p>;
  }

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Nama</th>
          <th className="border p-2">Kategori</th>
          <th className="border p-2">Harga</th>
          <th className="border p-2">Terakhir Update</th>
          <th className="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border p-2">{item.nama}</td>
            <td className="border p-2">{item.kategori}</td>
            <td className="border p-2">{formatRupiah(item.harga)}</td>
            <td className="border p-2">
              {new Date(item.updatedAt).toLocaleDateString("id-ID")}
            </td>
            <td className="border p-2 space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
