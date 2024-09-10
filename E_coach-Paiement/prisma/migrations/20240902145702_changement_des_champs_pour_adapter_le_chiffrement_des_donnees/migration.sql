-- AlterTable
ALTER TABLE `Transaction` MODIFY `montant` VARCHAR(191) NOT NULL,
    MODIFY `id_session_coaching` VARCHAR(191) NULL,
    MODIFY `id_utilisateur` VARCHAR(191) NOT NULL;
