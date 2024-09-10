// import EncryptionService from '../src/services/CriptageService';
// import dotenv from 'dotenv';

// Charger les variables d'environnement
// dotenv.config()
// script.js

// Définir une fonction pour initialiser le paiement Stripe
function initializeStripePayment(stripePublicKey) {
    // Attendre que le DOM soit complètement chargé avant d'exécuter le script
    document.addEventListener('DOMContentLoaded', () => {
      // Initialiser Stripe avec la clé publique
      const stripe = Stripe(stripePublicKey);
  
      // Créer une instance d'éléments Stripe
      const elements = stripe.elements();
  
      // Créer un élément de carte sans le champ du code postal
      const cardElement = elements.create('card', { hidePostalCode: true });
      // Monter l'élément de carte dans le div avec l'ID 'card-element'
      cardElement.mount('#card-element');
  
      // Récupérer le formulaire de paiement et le div pour les messages de paiement
      const form = document.getElementById('payment-form');
      const paymentMessage = document.getElementById('payment-message');
  
      // Ajouter un écouteur d'événements pour le formulaire de soumission
      form.addEventListener('submit', async (event) => {
        // Empêcher le comportement par défaut du formulaire (rechargement de la page)
        event.preventDefault();
  
        // Récupérer le montant saisi par l'utilisateur
        const amount = document.getElementById('amount').value;
  
        // Créer un token à partir de l'élément de carte
        const { token, error } = await stripe.createToken(cardElement);
  
        if (error) {
          // Afficher les erreurs de création de token
          paymentMessage.textContent = `Erreur : ${error.message}`;
          paymentMessage.style.color = 'red';
        } else {
          // Envoyer le token et le montant au serveur
          const response = await fetch('/api/create-charge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token.id, amount: amount, userId: 1 }) // Remplacer userId par l'ID réel de l'utilisateur
          });
  
          // Récupérer la réponse du serveur
          const data = await response.json();
  
          if (data.success) {
            // Afficher un message de succès
            paymentMessage.textContent = 'Paiement réussi !';
            paymentMessage.style.color = 'green';
            // Afficher les informations de la transaction dans le message de paiement
            paymentMessage.textContent += `\nTransaction ID: ${data.transaction.ref_transaction}  \nMontant: ${data.transaction.montant} 
            \ndate_validation_transaction: ${data.transaction.date_validation_transaction}  \ntype_transaction: ${data.transaction.type_transaction}
            \nnum_mode_paiement: ${data.transaction.num_mode_paiement}   \ndate_initiation_transaction: ${data.transaction.date_initiation_transaction}  \nStatut: ${data.transaction.statu}`;


            // paymentMessage.textContent = 'Paiement avec des donnees claires !';
            // paymentMessage.style.color = 'blue';


            // const encryptionService = new EncryptionService(process.env.ENCRYPTION_KEY);

            // // Exemple de récupération et de déchiffrement des données
            // const encryptedTransaction = await transactionRepository.findById(transactionId);
            // const decryptedRef = encryptionService.decryptData(encryptedTransaction.ref);
            // const decryptedModePaiement = encryptionService.decryptData(encryptedTransaction.modePaiement);









          } else {
            // Afficher un message d'erreur
            paymentMessage.textContent = `Erreur : ${data.error}`;
            paymentMessage.style.color = 'red';
          }
        }
      });
    });
  }
  