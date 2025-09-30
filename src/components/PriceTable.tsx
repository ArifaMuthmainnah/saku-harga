import { ItemHarga, formatRupiah } from "@/lib/useHarga";

interface Props {
  data: ItemHarga[];
}

export default function PriceTable({ data }: Props) {
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
          <th className="border p-2">Update</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
