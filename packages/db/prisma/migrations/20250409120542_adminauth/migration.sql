/*
  Warnings:

  - You are about to drop the column `adminId` on the `Auth` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_adminId_fkey";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "adminId";

-- CreateTable
CREATE TABLE "AdminAuth" (
    "id" TEXT NOT NULL,
    "verifyEmail" BOOLEAN NOT NULL DEFAULT false,
    "verifyToken" TEXT,
    "otp" INTEGER,
    "otpExpiresAt" TIMESTAMP(3),
    "adminId" TEXT NOT NULL,

    CONSTRAINT "AdminAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminAuth_verifyToken_key" ON "AdminAuth"("verifyToken");

-- CreateIndex
CREATE UNIQUE INDEX "AdminAuth_otp_key" ON "AdminAuth"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "AdminAuth_adminId_key" ON "AdminAuth"("adminId");

-- AddForeignKey
ALTER TABLE "AdminAuth" ADD CONSTRAINT "AdminAuth_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
