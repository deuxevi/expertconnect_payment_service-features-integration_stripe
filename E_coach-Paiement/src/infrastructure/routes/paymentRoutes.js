import { Router } from 'express';
import { createCharge } from '../../controllers/paypalController.js';

// Créer un routeur pour les routes de paiement
const router = Router();

// Définir la route pour créer une charge
router.get('/pay_by_paypal', createCharge);
router.get('/success', paymentController.successPage);
router.get('/cancel', paymentController.cancelPage);

export default router;
