import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import paymentRoutes from './infrastructure/routes/paymentRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

// Charger les variables d'environnement
dotenv.config();

// Obtenir le chemin du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialiser l'application Express
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Utiliser les routes de paiement et le middleware de gestion des erreurs
app.use('/api', paymentRoutes);
app.use(errorHandler);

// Route pour servir le fichier HTML principal
app.get('/payement', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Démarrer le serveur sur le port spécifié dans les variables d'environnement
app.listen(3000, () => console.log(`Serveur démarré sur le port ${process.env.BASE_URL}`));
