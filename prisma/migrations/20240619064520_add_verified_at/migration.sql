/*
  Warnings:

  - Added the required column `verified_at` to the `Kurator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified_at` to the `Seniman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Kurator` ADD COLUMN `verified_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Seniman` ADD COLUMN `verified_at` DATETIME(3) NOT NULL;
