import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage(); // <-- garde le fichier en mémoire
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Seules les images sont autorisées !"));
};

export const upload = multer({ storage, fileFilter });
