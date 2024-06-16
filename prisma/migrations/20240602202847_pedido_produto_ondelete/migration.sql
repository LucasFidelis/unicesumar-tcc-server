-- DropForeignKey
ALTER TABLE `Produto` DROP FOREIGN KEY `Produto_pedidoId_fkey`;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
