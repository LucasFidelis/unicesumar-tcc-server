-- CreateTable
CREATE TABLE `Separacao` (
    `id` VARCHAR(191) NOT NULL,
    `pedidoId` VARCHAR(191) NOT NULL,
    `separadorId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Separacao` ADD CONSTRAINT `Separacao_separadorId_fkey` FOREIGN KEY (`separadorId`) REFERENCES `Separador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Separacao` ADD CONSTRAINT `Separacao_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
