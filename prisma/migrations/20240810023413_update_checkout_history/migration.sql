/*
  Warnings:

  - You are about to drop the column `proof_url` on the `CheckoutHistory` table. All the data in the column will be lost.
  - The values [CANCELED] on the enum `CheckoutHistory_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `CheckoutHistory` DROP COLUMN `proof_url`,
    ADD COLUMN `rejectionReason` TEXT NULL,
    MODIFY `status` ENUM('SUCCESS', 'REJECTED', 'PENDING', 'VALIDATING', 'EXPIRED') NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE `PaymentDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkoutHistoryId` INTEGER NOT NULL,
    `nama_pemilik_rekening` VARCHAR(191) NOT NULL,
    `bank_pengirim` VARCHAR(191) NOT NULL,
    `bank_tujuan` VARCHAR(191) NOT NULL,
    `bukti_transfer_url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PaymentDetails_checkoutHistoryId_key`(`checkoutHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentDetails` ADD CONSTRAINT `PaymentDetails_checkoutHistoryId_fkey` FOREIGN KEY (`checkoutHistoryId`) REFERENCES `CheckoutHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
