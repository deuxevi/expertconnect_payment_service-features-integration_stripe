/*
  Warnings:

  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConversationUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentsIntent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Conversation` DROP FOREIGN KEY `Conversation_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `ConversationUser` DROP FOREIGN KEY `ConversationUser_conversation_id_fkey`;

-- DropForeignKey
ALTER TABLE `ConversationUser` DROP FOREIGN KEY `ConversationUser_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_conversation_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `PaymentsIntent` DROP FOREIGN KEY `PaymentsIntent_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Subscriptions` DROP FOREIGN KEY `Subscriptions_user_id_fkey`;

-- DropTable
DROP TABLE `Conversation`;

-- DropTable
DROP TABLE `ConversationUser`;

-- DropTable
DROP TABLE `Message`;

-- DropTable
DROP TABLE `PaymentsIntent`;

-- DropTable
DROP TABLE `Subscriptions`;

-- DropTable
DROP TABLE `Test`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Transaction` (
    `id_transaction` INTEGER NOT NULL AUTO_INCREMENT,
    `montant` INTEGER NOT NULL,
    `date_initiation_transaction` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_validation_transaction` DATETIME(3) NULL,
    `num_mode_paiement` VARCHAR(191) NOT NULL,
    `type_transaction` VARCHAR(191) NOT NULL,
    `id_session_coaching` INTEGER NULL,
    `id_utilisateur` INTEGER NOT NULL,
    `statu` VARCHAR(191) NOT NULL,
    `ref_transaction` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_transaction`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
