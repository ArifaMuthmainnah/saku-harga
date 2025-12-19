export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* LEFT */}
        <span>
          © 2025 <span className="font-semibold text-white">Saku-Harga</span>
        </span>

        {/* CENTER */}
        <span className="text-xs text-gray-500">
          Versi v2 · UAS POPL
        </span>

        {/* RIGHT */}
        <span className="text-xs text-gray-500">
          Developed with Next.js & Tailwind CSS
        </span>

      </div>
    </footer>
  );
}
