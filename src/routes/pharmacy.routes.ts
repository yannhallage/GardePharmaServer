import { Router } from 'express';
import {
    getHistoriqueGardeById,
    creerGarde,
    getConsulterGardeById,
    ModifierProfil
} from '../controllers/pharmacy.controller';
import { validateParams, validateRequest } from '../middlewares/validateRequest';
import {
    gardeIdSchema,
    gardeCreerSchema,
    profilUpdateSchema
} from '../validations/validation';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/gardes/histroriques/:id',
    // verifyToken,
    validateParams(gardeIdSchema),
    getHistoriqueGardeById
);
router.get('/gardes/consulterGardes/:id',
    // verifyToken,
    validateParams(gardeIdSchema),
    getConsulterGardeById
);
router.post('/gardes/creergardes',
    // verifyToken,
    validateRequest(gardeCreerSchema),
    creerGarde
);
router.put('/gardes/modifierProfil/:id',
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(profilUpdateSchema),
    ModifierProfil
);

export default router;
