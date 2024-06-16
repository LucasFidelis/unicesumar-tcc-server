/*
  Warnings:

  - A unique constraint covering the columns `[separadorId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `separadorId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_separadorId_key` ON `Usuario`(`separadorId`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_separadorId_fkey` FOREIGN KEY (`separadorId`) REFERENCES `Separador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
