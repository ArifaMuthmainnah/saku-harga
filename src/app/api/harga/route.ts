import { NextResponse } from "next/server";
import { Kategori } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wilayah = searchParams.get("wilayah");

    const where: any = {};
    if (wilayah) where.wilayah = wilayah;

    const data = await prisma.harga.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET /api/harga error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data harga" },
      { status: 500 }
    );
  }
}

// ✅ TAMBAHAN: POST /api/harga (tambah data)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, kategori, harga, satuan, wilayah } = body;

    if (!nama || harga === undefined || !satuan || !wilayah) {
      return NextResponse.json(
        { message: "Semua field wajib diisi (nama, harga, satuan, wilayah)" },
        { status: 400 }
      );
    }

    // ✅ kategori optional (karena ada default pokok)
    // kalau kategori dikirim, pastikan nilainya valid enum
    if (kategori && !Object.values(Kategori).includes(kategori)) {
      return NextResponse.json(
        { message: "Kategori tidak valid (pokok/sayur/protein/lainnya)" },
        { status: 400 }
      );
    }

    const data = await prisma.harga.create({
      data: {
        nama,
        ...(kategori ? { kategori: kategori as Kategori } : {}), // ✅ cast + optional
        harga: Number(harga),
        satuan,
        wilayah,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("GET /api/harga error:", error);
    return NextResponse.json(
        { message: error?.message ?? "Gagal mengambil data harga" },
        { status: 500 }
    );
}

}