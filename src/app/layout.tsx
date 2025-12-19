import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Saku-Harga",
  description: "Pantau harga barang kebutuhan pokok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />

        <main className="container mx-auto pt-4">
          {children}
          <Footer />
        </main>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
