import crypto from 'crypto'; // Importer le module crypto de Node.js

// Définir une classe pour le service de chiffrement
class EncryptionService {
  // Le constructeur prend une clé secrète comme paramètre
  constructor(secretKey) {
    // Vérifier que la clé a une longueur de 32 octets
    if (Buffer.from(secretKey).length !== 32) {
      throw new Error('Invalid key length. Key must be 32 bytes.');
    }
    this.secretKey = secretKey; // Stocker la clé secrète
  }

  // Méthode pour chiffrer les données
  encryptData(data) {
    // Convertir les données en chaîne de caractères si elles ne le sont pas déjà
    const dataString = typeof data === 'string' ? data : String(data);

    // Générer un vecteur d'initialisation (IV) aléatoire de 16 octets
    const iv = crypto.randomBytes(16);

    // Créer un objet de chiffrement en utilisant l'algorithme AES-256-CBC
    // Le secretKey doit être converti en Buffer
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.secretKey), iv);

    // Chiffrer les données
    let encrypted = cipher.update(dataString);

    // Finaliser le chiffrement et concaténer les résultats
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Retourner l'IV et les données chiffrées sous forme de chaîne hexadécimale
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }


  
  // Méthode pour déchiffrer les données
  decryptData(encryptedData) {
    // Séparer l'IV et les données chiffrées
    const textParts = encryptedData.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex'); // Récupérer l'IV
    const encryptedText = Buffer.from(textParts.join(':'), 'hex'); // Récupérer les données chiffrées

    // Créer un objet de déchiffrement en utilisant l'algorithme AES-256-CBC
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.secretKey), iv);

    // Déchiffrer les données
    let decrypted = decipher.update(encryptedText);

    // Finaliser le déchiffrement et concaténer les résultats
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Retourner les données déchiffrées sous forme de chaîne
    return decrypted.toString();
  }
}

// Exporter la classe EncryptionService pour l'utiliser dans d'autres parties de l'application
export default EncryptionService;
