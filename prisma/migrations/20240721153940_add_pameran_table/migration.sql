-- CreateTable
CREATE TABLE `Pameran` (
    `id` VARCHAR(191) NOT NULL,
    `nama_pameran` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `banner_url` VARCHAR(191) NOT NULL,
    `sampul_url` VARCHAR(191) NOT NULL,
    `tgl_mulai` DATETIME(3) NOT NULL,
    `tgl_selesai` DATETIME(3) NOT NULL,
    `status` ENUM('SCHEDULED', 'OPEN', 'CLOSE') NOT NULL,
    `created_mode` ENUM('INDIVIDUAL', 'GROUP') NOT NULL DEFAULT 'INDIVIDUAL',
    `seniman_id` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Pameran_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KaryaPameran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pameran_id` VARCHAR(191) NOT NULL,
    `karya_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pameran` ADD CONSTRAINT `Pameran_seniman_id_fkey` FOREIGN KEY (`seniman_id`) REFERENCES `Seniman`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KaryaPameran` ADD CONSTRAINT `KaryaPameran_pameran_id_fkey` FOREIGN KEY (`pameran_id`) REFERENCES `Pameran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KaryaPameran` ADD CONSTRAINT `KaryaPameran_karya_id_fkey` FOREIGN KEY (`karya_id`) REFERENCES `Karya`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
