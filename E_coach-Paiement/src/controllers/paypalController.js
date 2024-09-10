import CreateTransaction from '../application/use_cases/CreateTransaction.js';
import TransactionRepository from '../domain/repositories/TransactionRepository.js';
import prisma from '../infrastructure/database/prismaClient.js';
import dotenv from 'dotenv';
import paypal from 'paypal-rest-sdk';

// Charger les variables d'environnement
dotenv.config();

// Configuration de PayPal avec les clés et le mode
const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

paypal.configure({
  'mode': PAYPAL_MODE, //sandbox or live
  'client_id': PAYPAL_CLIENT_KEY,
  'client_secret': PAYPAL_SECRET_KEY
});

// Initialiser le dépôt et le cas d'utilisation pour les transactions
const transactionRepository = new TransactionRepository(prisma);
const createTransaction = new CreateTransaction(transactionRepository);

// Contrôleur pour créer une charge PayPal et enregistrer une transaction
export const createCharge = async (req, res) => {
  const { amount, userId } = req.body;

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/api/success",
      "cancel_url": "http://localhost:3000/api/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Exemple de produit",
          "sku": "001",
          "price": (amount / 100).toFixed(2), // PayPal attend un montant en format décimal
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": (amount / 100).toFixed(2)
      },
      "description": "Exemple de description"
    }]
  };

  try {
    // Créer un paiement PayPal
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        // Rediriger l'utilisateur vers la page de PayPal pour approuver le paiement
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            return res.redirect(payment.links[i].href);
          }
        }
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Contrôleur pour gérer la page de succès après le paiement PayPal
export const successPage = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "25.00" // Total en décimal
      }
    }]
  };

  try {
    // Exécuter le paiement PayPal après l'approbation
    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        // Préparer les données de la transaction
        const transactionData = {
          montant: parseInt(payment.transactions[0].amount.total * 100), // Montant en centimes
          dateInitiation: new Date(),
          dateValidation: new Date(),
          modePaiement: 'paypal',
          type: payment.intent,
          utilisateurId: req.query.userId, // On récupère le userId des paramètres
          statut: payment.state,
          ref: payment.id,
        };

        // Créer la transaction dans la base de données
        const transaction = await createTransaction.execute(transactionData);

        // Réponse de succès
        res.send({ success: true, payment, transaction });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Contrôleur pour gérer l'annulation du paiement PayPal
export const cancelPage = async (req, res) => {
  try {
    res.send("Paiement annulé.");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
