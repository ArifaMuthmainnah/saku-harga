import { NextResponse } from "next/server";
import { Kategori } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { log } from "@/lib/logger";

/* =======================
   PUT /api/harga/:id
======================= */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { nama, kategori, harga, satuan, wilayah } = body;

    if (!nama || harga === undefined || !satuan || !wilayah) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    if (kategori && !Object.values(Kategori).includes(kategori)) {
      return NextResponse.json(
        { message: "Kategori tidak valid" },
        { status: 400 }
      );
    }

    const updated = await prisma.harga.update({
      where: { id: Number(params.id) },
      data: {
        nama,
        kategori,
        harga: Number(harga),
        satuan,
        wilayah,
      },
    });

    log("info", "Harga berhasil diupdate", {
      id: params.id,
      nama,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    log("error", "PUT /api/harga/:id gagal", {
      error: error.message,
    });

    return NextResponse.json(
      { message: "Gagal mengupdate harga" },
      { status: 500 }
    );
  }
}

/* =======================
   DELETE /api/harga/:id
======================= */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.harga.delete({
      where: { id: Number(params.id) },
    });

    log("info", "Harga berhasil dihapus", { id: params.id });

    return NextResponse.json(
      { message: "Data berhasil dihapus" },
      { status: 200 }
    );
  } catch (error: any) {
    log("error", "DELETE /api/harga/:id gagal", {
      error: error.message,
    });

    return NextResponse.json(
      { message: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}
