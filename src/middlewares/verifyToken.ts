
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { tokenSecret } from '../types/requeteHttpAuth.type';

const SECRET = process.env.JWT_SECRET || tokenSecret;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

    const token = authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ error: 'Token invalide' });

    try {
        const decoded = jwt.verify(token, SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token expiré ou invalide' });
    }
};
