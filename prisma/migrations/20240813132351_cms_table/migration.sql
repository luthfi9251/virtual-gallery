-- CreateTable
CREATE TABLE `CMSPageVariable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `page_group` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `last_updated_by_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CMSPageVariable_tag_key`(`tag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CMSPageVariable` ADD CONSTRAINT `CMSPageVariable_last_updated_by_id_fkey` FOREIGN KEY (`last_updated_by_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
