import EncryptionService from '../src/services/CriptageService.js';
import prisma from '../src/infrastructure/database/prismaClient.js';
import TransactionRepository from '../src/domain/repositories/TransactionRepository.js';

import dotenv from 'dotenv';

dotenv.config();


// Initialiser Prisma Client
const transactionRepository = new TransactionRepository(prisma);

const encryptionService = new EncryptionService(process.env.ENCRYPTION_KEY);

// Fonction pour récupérer et afficher les données
const displayTransactions = async () => {
  try {
    // Supposons que vous avez une fonction pour récupérer toutes les transactions
    const transactions = await transactionRepository.findAll();

    transactions.forEach(transaction => {
      // Afficher les données chiffrées
      console.log('Données chiffrées:', transaction);
      

      // Déchiffrer les données sensibles
      const decryptedRef = encryptionService.decryptData(transaction.ref_transaction);
      const decryptedModePaiement = encryptionService.decryptData(transaction.num_mode_paiement);
      const decryptedStatut = encryptionService.decryptData(transaction.statut);
      const decryptedMontant = encryptionService.decryptData(transaction.montant);
      // const decryptedDateValide = encryptionService.decryptData(transaction.date_validation_transaction);
      // const decrypteddateInitier = encryptionService.decryptData(transaction.date_initiation_transaction);
      const decryptedIdUtilisateur = encryptionService.decryptData(transaction.id_utilisateur);
      // const decryptedIdTransact = encryptionService.decryptData(transaction.id_transaction);



      // // Afficher les données déchiffrées
      console.log('Référence déchiffrée:', decryptedRef);
      console.log('Mode de paiement déchiffré:', decryptedModePaiement);

      console.log('Statut déchiffré:', decryptedStatut);
      console.log('Montant déchiffré:', decryptedMontant);
      // console.log('Date validation déchiffré:', decryptedDateValide);
      // console.log('Date Initier déchiffré:', decrypteddateInitier);
      // console.log('Id transaction déchiffré:', decryptedIdTransact);
      console.log('Id utilisateur déchiffré:', decryptedIdUtilisateur);
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error);
  }
};

// Appeler la fonction pour afficher les transactions
displayTransactions();
