import { Router } from 'express';
import { getHistoriqueGardeById, creerGarde ,getConsulterGardeById} from '../controllers/pharmacy.controller';
import { validateParams } from '../middlewares/validateRequest';
import { gardeIdSchema, gardeCreerSchema } from '../validations/validation';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/gardes/histroriques/:id',
    verifyToken,
    validateParams(gardeIdSchema),
    getHistoriqueGardeById
);
router.get('/gardes/consulterGardes/:id',
    verifyToken,
    validateParams(gardeIdSchema),
    getConsulterGardeById
);
router.post('/gardes/creergardes',
    verifyToken,
    validateParams(gardeCreerSchema),
    creerGarde
);
router.put('/gardes/modifierProfil/:id',
    verifyToken,
    validateParams(gardeCreerSchema),
    modifierProfil
);

export default router;
