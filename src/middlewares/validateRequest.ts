import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodRawShape, ZodSchema } from 'zod';

export const validateRequest = (schema: ZodObject<ZodRawShape>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error: any) {
            console.error('Erreur validation corps:', error.errors);
            return res.status(400).json({
                success: false,
                message: 'Validation échouée (body)',
                errors: error.errors,
            });
        }
    };
};


export const validateParams = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.params = schema.parse(req.params);
            next();
        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: 'Validation échouée (params)',
                errors: error.errors,
            });
        }
    };
};
