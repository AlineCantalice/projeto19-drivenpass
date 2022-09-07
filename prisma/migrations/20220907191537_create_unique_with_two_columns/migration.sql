/*
  Warnings:

  - A unique constraint covering the columns `[title,cardTag]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,credentialTag]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,wifiTag]` on the table `Wifi` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cards_title_key";

-- DropIndex
DROP INDEX "Credentials_credentialTag_key";

-- CreateIndex
CREATE UNIQUE INDEX "Cards_title_cardTag_key" ON "Cards"("title", "cardTag");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_title_credentialTag_key" ON "Credentials"("title", "credentialTag");

-- CreateIndex
CREATE UNIQUE INDEX "Wifi_title_wifiTag_key" ON "Wifi"("title", "wifiTag");
