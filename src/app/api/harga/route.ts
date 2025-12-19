import { NextRequest, NextResponse } from "next/server";
import { Kategori } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wilayah = searchParams.get("wilayah");

    const where: any = {};
    if (wilayah) where.wilayah = wilayah;

    log("info", "GET /api/harga", { wilayah });

    const data = await prisma.harga.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    log("error", "GET /api/harga failed", { error: error?.message });
    return NextResponse.json(
      { message: "Gagal mengambil data harga" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, kategori, harga, satuan, wilayah } = body;

    if (!nama || harga === undefined || !satuan || !wilayah) {
      log("warn", "POST /api/harga validation failed", body);
      return NextResponse.json(
        { message: "Semua field wajib diisi (nama, harga, satuan, wilayah)" },
        { status: 400 }
      );
    }

    if (kategori && !Object.values(Kategori).includes(kategori)) {
      log("warn", "POST /api/harga invalid kategori", { kategori });
      return NextResponse.json(
        { message: "Kategori tidak valid (pokok/sayur/protein/lainnya)" },
        { status: 400 }
      );
    }

    const data = await prisma.harga.create({
      data: {
        nama,
        ...(kategori ? { kategori: kategori as Kategori } : {}),
        harga: Number(harga),
        satuan,
        wilayah,
      },
    });

    log("info", "POST /api/harga success", {
      id: data.id,
      nama,
      wilayah,
      kategori,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    log("error", "POST /api/harga failed", { error: error?.message });
    return NextResponse.json(
      { message: error?.message ?? "Gagal mengambil data harga" },
      { status: 500 }
    );
  }
}
