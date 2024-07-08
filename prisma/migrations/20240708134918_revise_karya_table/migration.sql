/*
  Warnings:

  - You are about to drop the column `keterangan` on the `Karya` table. All the data in the column will be lost.
  - Added the required column `aliran` to the `Karya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media` to the `Karya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teknik` to the `Karya` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Karya` DROP COLUMN `keterangan`,
    ADD COLUMN `aliran` VARCHAR(191) NOT NULL,
    ADD COLUMN `media` VARCHAR(191) NOT NULL,
    ADD COLUMN `teknik` VARCHAR(191) NOT NULL;
