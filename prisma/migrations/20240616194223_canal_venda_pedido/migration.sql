-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_canalVendaId_fkey` FOREIGN KEY (`canalVendaId`) REFERENCES `CanalVenda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
