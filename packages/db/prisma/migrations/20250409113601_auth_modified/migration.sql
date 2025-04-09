-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "adminId" TEXT;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
