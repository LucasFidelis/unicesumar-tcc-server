-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `funcao` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
