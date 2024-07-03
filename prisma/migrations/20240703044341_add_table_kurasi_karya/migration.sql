-- CreateTable
CREATE TABLE `KurasiKarya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kurator_id` VARCHAR(191) NOT NULL,
    `karya_id` VARCHAR(191) NOT NULL,
    `komentar` TEXT NOT NULL,
    `harga_maks` DECIMAL(65, 30) NOT NULL,
    `harga_min` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `KurasiKarya_kurator_id_karya_id_key`(`kurator_id`, `karya_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KurasiKarya` ADD CONSTRAINT `KurasiKarya_kurator_id_fkey` FOREIGN KEY (`kurator_id`) REFERENCES `Kurator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KurasiKarya` ADD CONSTRAINT `KurasiKarya_karya_id_fkey` FOREIGN KEY (`karya_id`) REFERENCES `Karya`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
