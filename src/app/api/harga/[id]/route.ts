import { NextResponse } from "next/server";
import { Kategori } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// ✅ PUT /api/harga/:id (update data)
export async function PUT(req: Request, ctx: { params: { id: string } }) {
  try {
    const id = Number(ctx.params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const body = await req.json();
    const { nama, kategori, harga, satuan, wilayah } = body;

    if (!nama || !kategori || harga === undefined || !satuan || !wilayah) {
      return NextResponse.json(
        { message: "Semua field wajib diisi (nama, kategori, harga, satuan, wilayah)" },
        { status: 400 }
      );
    }

    const updated = await prisma.harga.update({
      where: { id },
      data: {
        nama,
        kategori,
        harga: Number(harga),
        satuan,
        wilayah,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/harga/:id error:", error);
    return NextResponse.json(
      { message: "Gagal update data harga" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/harga/:id (hapus data)
export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  try {
    const id = Number(ctx.params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    await prisma.harga.delete({ where: { id } });

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/harga/:id error:", error);
    return NextResponse.json(
      { message: "Gagal hapus data harga" },
      { status: 500 }
    );
  }
}
