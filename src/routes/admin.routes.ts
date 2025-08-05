

import express from 'express';
import { getAllHistoriqueGardes,getAllGardes } from '../controllers/admin.controller';
import { verifyToken } from '../middlewares/verifyToken';
import {
    gardeIdSchema,
    gardeCreerSchema,
    profilUpdateSchema
} from '../validations/validation';
import { validateParams, validateRequest } from '../middlewares/validateRequest';

const router = express.Router();



router.get('/gardes/listehistorique/:id',
    // verifyToken,
    validateParams(gardeIdSchema),
    getAllHistoriqueGardes
);
router.get('/gardes/gererGardes/:id',
    // verifyToken,
    validateParams(gardeIdSchema),
    getAllGardes
);

export default router;