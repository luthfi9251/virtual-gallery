/*
  Warnings:

  - You are about to drop the column `foto_profil` on the `Kurator` table. All the data in the column will be lost.
  - You are about to drop the column `foto_profil` on the `Seniman` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Kurator` DROP COLUMN `foto_profil`;

-- AlterTable
ALTER TABLE `Seniman` DROP COLUMN `foto_profil`,
    MODIFY `verified_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `foto_profil` VARCHAR(191) NULL;
