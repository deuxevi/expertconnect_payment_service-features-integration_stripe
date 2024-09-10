/*
  Warnings:

  - You are about to drop the column `statu` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `statut` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `statu`,
    ADD COLUMN `statut` VARCHAR(191) NOT NULL;
