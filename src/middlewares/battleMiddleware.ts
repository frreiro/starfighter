import { Request, Response, NextFunction } from "express";
import usernamesSchemas from "../schemas/battleSchemas.js"



export async function usernamesValidate(req: Request, res: Response, next: NextFunction) {
    const { firstUser, secondUser } = req.body
    if (firstUser === secondUser) return res.sendStatus(422)

    const { error } = usernamesSchemas.validate({ firstUser, secondUser });
    if (error) return res.sendStatus(422);
    next();
}
