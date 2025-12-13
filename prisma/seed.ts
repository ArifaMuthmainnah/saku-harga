import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hash,  // penting: pakai hash, bukan teks biasa
      role: "admin",
    },
  });

  console.log("✅ Admin user berhasil dibuat / sudah ada.");
}

main()
  .catch((err) => {
    console.error("❌ Gagal seed admin:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
