import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { log } from "@/lib/logger";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      log("warn", "Login validation failed", { username });
      return NextResponse.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      log("warn", "Login failed: user not found", { username });
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      log("warn", "Login failed: wrong password", { username });
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    log("info", "Login success", { username, role: user.role });

    return NextResponse.json(
      {
        message: "Login berhasil",
        username: user.username,
        role: user.role,
      },
      { status: 200 }
    );
  } catch (err: any) {
    log("error", "Login error", { error: err?.message });
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat login" },
      { status: 500 }
    );
  }
}
