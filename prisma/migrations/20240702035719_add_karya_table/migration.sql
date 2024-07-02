-- CreateTable
CREATE TABLE `Karya` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `lukisan_url` VARCHAR(191) NOT NULL,
    `keterangan` TEXT NOT NULL,
    `harga` DECIMAL(65, 30) NULL,
    `panjang` DECIMAL(65, 30) NULL,
    `lebar` DECIMAL(65, 30) NULL,
    `status` ENUM('DIKURASI', 'TERKURASI', 'SELESAI', 'TERJUAL') NOT NULL DEFAULT 'DIKURASI',
    `seniman_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Karya` ADD CONSTRAINT `Karya_seniman_id_fkey` FOREIGN KEY (`seniman_id`) REFERENCES `Seniman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
