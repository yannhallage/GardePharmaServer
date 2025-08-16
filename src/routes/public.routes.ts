import { Router } from 'express';
import {
    gardeIdSchema,
    pharmacyRegisterSchemaByAdmin,
} from '../validations/validation';
import {
    getAllNotification,
    postNotification
} from '../controllers/public.controller';
import { validateParams, validateRequest } from '../middlewares/validateRequest';



const router = Router();


router.get('/notifications/:id',
    // verifyToken,
    validateParams(gardeIdSchema),
    getAllNotification
);

router.post('/notifications/:id',//
    // verifyToken,
    validateParams(gardeIdSchema),
    validateRequest(pharmacyRegisterSchemaByAdmin),
    postNotification
);


export default router;