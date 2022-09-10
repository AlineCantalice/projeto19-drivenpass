/*
  Warnings:

  - You are about to drop the column `cardTag` on the `Cards` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Cards` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `credentialTag` on the `Credentials` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Credentials` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title` on the `SafeNotes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `note` on the `SafeNotes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to drop the column `wifiTag` on the `Wifi` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Wifi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title,userId]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `SafeNotes` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `username` to the `Credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wifiName` to the `Wifi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CREDIT', 'DEBIT', 'BOTH');

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_userId_fkey";

-- DropIndex
DROP INDEX "Cards_title_cardTag_key";

-- DropIndex
DROP INDEX "Cards_userId_key";

-- DropIndex
DROP INDEX "Credentials_title_credentialTag_key";

-- DropIndex
DROP INDEX "Credentials_userId_key";

-- DropIndex
DROP INDEX "SafeNotes_title_key";

-- DropIndex
DROP INDEX "SafeNotes_userId_key";

-- DropIndex
DROP INDEX "Wifi_title_key";

-- DropIndex
DROP INDEX "Wifi_title_wifiTag_key";

-- DropIndex
DROP INDEX "Wifi_userId_key";

-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "cardTag",
ALTER COLUMN "cardNumber" SET DATA TYPE TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Credentials" DROP COLUMN "credentialTag",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "SafeNotes" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "note" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Wifi" DROP COLUMN "wifiTag",
ADD COLUMN     "wifiName" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "Sessions";

-- CreateIndex
CREATE UNIQUE INDEX "Cards_title_userId_key" ON "Cards"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_title_userId_key" ON "Credentials"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SafeNotes_userId_title_key" ON "SafeNotes"("userId", "title");
