import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // 1) Validasi input
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    // 2) Cek username sudah ada belum
    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Username sudah dipakai" },
        { status: 409 }
      );
    }

    // 3) Hash password
    const hash = await bcrypt.hash(password, 10);

    // 4) Simpan user baru (role = user)
    const user = await prisma.user.create({
      data: {
        username,
        password: hash,
        role: "user",
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: "Register berhasil", user },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat register" },
      { status: 500 }
    );
  }
}
