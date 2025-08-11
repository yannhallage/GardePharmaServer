import { Router } from 'express';
import {
    getHistoriqueGardeById,
    creerGarde,
    ModifierGardes,
    getConsulterGardeById,
    ModifierProfil
} from '../controllers/pharmacy.controller';
import { validateParams, validateRequest } from '../middlewares/validateRequest';
import {
    gardeIdSchema,
    gardeCreerSchema,
    profilUpdateSchema,
    updateGardesSchema
} from '../validations/validation';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

router.get('/histroriquesGardes/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    getHistoriqueGardeById
);
router.get('/consulterGardes/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    getConsulterGardeById
);
router.post('/creergardes/:id', 
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(gardeCreerSchema),
    creerGarde
);
router.put('/modifierProfil/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(profilUpdateSchema),
    ModifierProfil
);
router.put('/modifierGardes/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(updateGardesSchema),
    ModifierGardes
);

export default router;
