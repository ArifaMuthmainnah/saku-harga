import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // 1. Ambil body JSON dari request
    const body = await req.json();
    const { username, password } = body;

    // 2. Validasi input kosong
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // 3. Cari user di database berdasarkan username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // user tidak ditemukan
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 401 }
      );
    }

    // 4. Bandingkan password plain text dengan password hash di database
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      // password salah
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    // 5. Kalau lolos, balikan data user yg dibutuhkan frontend
    // (untuk UAS cukup username + role)
    return NextResponse.json(
      {
        message: "Login berhasil",
        username: user.username,
        role: user.role,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat login" },
      { status: 500 }
    );
  }
}
