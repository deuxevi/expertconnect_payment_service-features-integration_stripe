// import Transaction from '../../domain/models/Transaction.js';

// // Cas d'utilisation pour créer une transaction
// export default class CreateTransaction {
//   constructor(transactionRepository) {
//     this.transactionRepository = transactionRepository;
//   }

//   // Exécuter la création de la transaction
//   async execute(transactionData) {
//     const transaction = new Transaction(transactionData);
//     return this.transactionRepository.create(transaction);
//   }
// }

// Cas d'utilisation pour créer une transaction

import CryptageService from '../../services/CriptageService.js';
import Transaction from '../../domain/models/Transaction.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config()

class CreateTransaction {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
    this.encryptage = new CryptageService(process.env.ENCRYPTION_KEY);
  }

  async execute(transactionData) {
    
    // Chiffrer les données sensibles
    transactionData.ref = this.encryptage.encryptData(transactionData.ref);
    transactionData.modePaiement = this.encryptage.encryptData(transactionData.modePaiement);
    transactionData.statut = this.encryptage.encryptData(transactionData.statut);
    transactionData.type = this.encryptage.encryptData(transactionData.type);
    // transactionData.dateInitiation = this.encryptage.encryptData(transactionData.dateInitiation);
    // transactionData.dateValidation = this.encryptage.encryptData(transactionData.dateValidation);
    transactionData.montant = this.encryptage.encryptData(transactionData.montant);
    transactionData.utilisateurId = this.encryptage.encryptData(transactionData.utilisateurId);
   
   
    // Créer une instance de Transaction avec les données chiffrées
    const transaction = new Transaction(transactionData);

    // Enregistrer la transaction dans le dépôt
    return this.transactionRepository.create(transaction);
  }
}

export default CreateTransaction;
