import { Request, Response, NextFunction } from "express";
import axios from "axios";

export default async function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    if (error.type === 404) return res.sendStatus(404);
    return res.sendStatus(500);

}