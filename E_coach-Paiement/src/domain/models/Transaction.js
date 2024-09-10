// Modèle de données pour une transaction
export default class Transaction {
    constructor({ montant, dateInitiation, dateValidation, modePaiement, type, utilisateurId, statut, ref }) {
      this.montant = montant;
      this.dateInitiation = dateInitiation;
      this.dateValidation = dateValidation;
      this.modePaiement = modePaiement;
      this.type = type;
      this.utilisateurId = utilisateurId;
      this.statut = statut;
      this.ref = ref;
    }
  }
  