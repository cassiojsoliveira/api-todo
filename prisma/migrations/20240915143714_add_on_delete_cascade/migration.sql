-- DropForeignKey
ALTER TABLE "Atividades" DROP CONSTRAINT "Atividades_userId_fkey";

-- AddForeignKey
ALTER TABLE "Atividades" ADD CONSTRAINT "Atividades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
