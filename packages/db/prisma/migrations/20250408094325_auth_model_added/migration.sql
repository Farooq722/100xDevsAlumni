/*
  Warnings:

  - You are about to drop the column `verifyEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_verifyToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifyEmail",
DROP COLUMN "verifyToken";

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "verifyEmail" BOOLEAN NOT NULL DEFAULT false,
    "verifyToken" TEXT,
    "otp" INTEGER,
    "otpExpiresAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_verifyToken_key" ON "Auth"("verifyToken");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_otp_key" ON "Auth"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
