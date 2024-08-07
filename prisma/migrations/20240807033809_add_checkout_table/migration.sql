-- AlterTable
ALTER TABLE `Pameran` ADD COLUMN `views` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `no_whatsapp` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `CheckoutHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pameran_id` VARCHAR(191) NOT NULL,
    `karya_id` VARCHAR(191) NOT NULL,
    `expiredDate` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `proof_url` TEXT NULL,
    `status` ENUM('SUCCESS', 'CANCELED', 'PENDING', 'VALIDATING', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `buyer_id` VARCHAR(191) NOT NULL,
    `validate_by_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CheckoutHistory` ADD CONSTRAINT `CheckoutHistory_pameran_id_fkey` FOREIGN KEY (`pameran_id`) REFERENCES `Pameran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckoutHistory` ADD CONSTRAINT `CheckoutHistory_karya_id_fkey` FOREIGN KEY (`karya_id`) REFERENCES `Karya`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckoutHistory` ADD CONSTRAINT `CheckoutHistory_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckoutHistory` ADD CONSTRAINT `CheckoutHistory_validate_by_id_fkey` FOREIGN KEY (`validate_by_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
