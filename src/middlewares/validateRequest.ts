// middlewares/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodRawShape } from 'zod';

export const validateRequest = (schema: ZodObject<ZodRawShape>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: any) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: 'Validation échouée',
                errors: error.errors,
            });
        }
    };
};
