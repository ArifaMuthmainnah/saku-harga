import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Saku-Harga",
  description: "Pantau harga barang kebutuhan pokok",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
