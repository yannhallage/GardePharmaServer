

import express from 'express';
import {
    getAllHistoriqueGardes,
    getAllGardes,
    ModifierProfil,
    ajouterPharmacyParAdmin,
    SousRequetUpAndDel,
    postNotification,
    getAllNotification,
    getAllPharmacy

} from '../controllers/admin.controller';

import { verifyToken } from '../middlewares/verifyToken';
import {
    gardeIdSchema,
    gardeCreerSchema,
    pharmacyRegisterSchemaByAdmin,
    sousrequete,
    profilUpdateSchemaAdmin
} from '../validations/validation';
import { validateParams, validateRequest } from '../middlewares/validateRequest';
import { creerGarde } from '../controllers/pharmacy.controller';

const router = express.Router();



router.get('/listehistorique/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    getAllHistoriqueGardes
);
router.get('/gererGardes/:id', //
    // verifyToken,
    validateParams(gardeIdSchema),
    getAllGardes
);
router.post('/creergardes/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(gardeCreerSchema),
    creerGarde
);

router.get('/obtenirListePharmacy/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    getAllPharmacy
);
router.put('/mofifierProfil/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(profilUpdateSchemaAdmin),
    ModifierProfil
);

router.post('/creerPharmacy/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(pharmacyRegisterSchemaByAdmin),
    ajouterPharmacyParAdmin
);

// les sous requtes fais par l'admin
router.post(`/sousrequete/:id`,//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(sousrequete),
    SousRequetUpAndDel
);
router.post('/notifications/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(pharmacyRegisterSchemaByAdmin),
    postNotification
);

router.get('/notifications/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    getAllNotification
);
// 

export default router;