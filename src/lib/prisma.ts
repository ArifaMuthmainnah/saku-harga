// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Gunakan globalThis untuk mencegah multiple instance di dev
declare global {
  // TypeScript global declaration
  var prisma: PrismaClient | undefined;
}

// Gunakan singleton
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : [],
  });

// Simpan ke global untuk development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
