import { ItemHarga, formatRupiah } from "@/lib/useHarga";

interface Props {
  data: ItemHarga[];
  onEdit?: (item: ItemHarga) => void;
  onDelete?: (id: number) => void;
}

export default function PriceTable({ data, onEdit, onDelete }: Props) {
  if (data.length === 0) {
    return <p className="text-gray-500">Tidak ada data harga.</p>;
  }

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="border p-2 text-left">Nama</th>
          <th className="border p-2 text-center">Kategori</th>
          <th className="border p-2 text-center">Harga</th>
          <th className="border p-2 text-center">Satuan</th>
          <th className="border p-2 text-center">Wilayah</th>
          <th className="border p-2 text-center">Terakhir Update</th>
          {(onEdit || onDelete) ? (
            <th className="border p-2 text-center">Aksi</th>
          ) : null}
        </tr>
      </thead>

      <tbody className="bg-gray-800 text-white">
        {data.map((item, idx) => (
          <tr
            key={item.id}
            className={idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
          >
            {/* Nama → kiri */}
            <td className="border p-2 text-left">{item.nama}</td>

            {/* Selain nama → tengah */}
            <td className="border p-2 text-center">{item.kategori}</td>
            <td className="border p-2 text-center">
              {formatRupiah(item.harga)}
            </td>
            <td className="border p-2 text-center">{item.satuan}</td>
            <td className="border p-2 text-center">{item.wilayah}</td>
            <td className="border p-2 text-center">
              {new Date(item.updatedAt).toLocaleDateString("id-ID")}
            </td>

            {(onEdit || onDelete) ? (
              <td className="border p-2 text-center space-x-2">
                {onEdit ? (
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                ) : null}

                {onDelete ? (
                  <button
                    onClick={() => onDelete(item.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                ) : null}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
