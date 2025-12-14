import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // 1. Ambil query param dari URL
    const { searchParams } = new URL(req.url);
    const wilayah = searchParams.get("wilayah");

    // 2. Siapkan kondisi where (kosong dulu)
    const where: any = {};

    // 3. Kalau ada query wilayah → tambahkan filter
    if (wilayah) {
      where.wilayah = wilayah;
    }

    // 4. Ambil data dari database
    const data = await prisma.harga.findMany({
      where,
      orderBy: {
        updatedAt: "desc",
      },
    });

    // 5. Return JSON
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET /api/harga error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data harga" },
      { status: 500 }
    );
  }
}
