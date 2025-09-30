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
      className="border rounded p-2 mb-4 w-full"
    />
  );
}
