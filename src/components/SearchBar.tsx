interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Cari barang..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded border border-gray-300 
                text-black placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                bg-white shadow-sm"
    />
  );
}
