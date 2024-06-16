-- CreateTable
CREATE TABLE `Separador` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Separador_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
