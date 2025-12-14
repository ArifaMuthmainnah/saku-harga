-- CreateEnum
CREATE TYPE "Kategori" AS ENUM ('pokok', 'sayur', 'protein', 'lainnya');

-- AlterTable
ALTER TABLE "Harga" ADD COLUMN     "kategori" "Kategori" NOT NULL DEFAULT 'pokok';
