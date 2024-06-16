-- CreateTable
CREATE TABLE `Pedido` (
    `id` VARCHAR(191) NOT NULL,
    `identificadorLoja` VARCHAR(191) NOT NULL,
    `nomeCliente` VARCHAR(191) NOT NULL,
    `emissao` VARCHAR(191) NOT NULL,
    `canalVendaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pedido_identificadorLoja_key`(`identificadorLoja`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
