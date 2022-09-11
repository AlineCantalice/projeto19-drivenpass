/*
  Warnings:

  - You are about to drop the column `cvc` on the `cards` table. All the data in the column will be lost.
  - Added the required column `securityCode` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "cvc",
ADD COLUMN     "securityCode" INTEGER NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT;
