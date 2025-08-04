


// conisder seulement les authenification & register & inscription admin

import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { adminSchema } from '../validations/validation';
import { AuthSchema,pharmacyRegisterSchema } from '../validations/validation';
import { createAdmin } from '../controllers/admin.controller';
import { authentification,inscriptionPharmacy } from '../controllers/auth.register.controller';

const router = express.Router();

router.post('/authentification', validateRequest(AuthSchema), authentification);
router.post('/creerAdmin', validateRequest(adminSchema), createAdmin);
router.post('/inscription', validateRequest(pharmacyRegisterSchema), inscriptionPharmacy);

export default router;