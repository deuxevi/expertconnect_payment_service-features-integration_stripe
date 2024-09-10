// repositories/TransactionRepository.js

export default class TransactionRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  // Méthode pour créer une nouvelle transaction
  async create(transaction) {
    return this.prisma.transaction.create({
      data: {
        montant: transaction.montant,
        date_initiation_transaction: transaction.dateInitiation,
        date_validation_transaction: transaction.dateValidation,
        num_mode_paiement: transaction.modePaiement,
        type_transaction: transaction.type,
        id_utilisateur: transaction.utilisateurId,
        statut: transaction.statut,
        ref_transaction: transaction.ref,
      },
    });
  }

  // Méthode pour récupérer toutes les transactions
  async findAll() {
    return await this.prisma.transaction.findMany();
  }

  // Méthode pour récupérer une transaction par ID
  async findById(id) {
    return await this.prisma.transaction.findUnique({
      where: { id: id },
    });
  }
}
