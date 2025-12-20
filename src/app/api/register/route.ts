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
      log("warn", "Register validation failed", { username });
      return NextResponse.json(
        { message: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      log("warn", "Register failed: password too short", { username });
      return NextResponse.json(
        { message: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) {
      log("warn", "Register failed: username exists", { username });
      return NextResponse.json(
        { message: "Username sudah dipakai" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

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

    log("info", "Register success", { username });

    return NextResponse.json(
      { message: "Register berhasil", user },
      { status: 201 }
    );
  } catch (err: any) {
    log("error", "Register error", { error: err?.message });
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat register" },
      { status: 500 }
    );
  }
}