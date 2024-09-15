/*
  Warnings:

  - You are about to drop the column `data` on the `Atividades` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Atividades" DROP COLUMN "data";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 18,
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '';
