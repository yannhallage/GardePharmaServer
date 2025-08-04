import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/admin.service';

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAdmin = await AdminService.create(req.body);
        res.status(201).json(newAdmin);
    } catch (err) {
        next(err);
    }
};
