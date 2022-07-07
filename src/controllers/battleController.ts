import { Request, Response } from "express";
import battleRepository from "../repositories/battleRepository.js";
import battleServices from "../services/battleServices.js";

export async function fightUsers(req: Request, res: Response) {
    const { firstUser, secondUser }: { firstUser: string, secondUser: string } = req.body;
    const firstUserStars = await battleServices.getUserData(firstUser);
    const secondUserStart = await battleServices.getUserData(secondUser);
    if (!firstUserStars || !secondUserStart) return res.sendStatus(404);
    const result = await battleServices.compareStars(firstUserStars, secondUserStart, firstUser, secondUser)
    await battleServices.insertBattle(result, firstUser, secondUser);
    res.status(200).send(result)
}

export async function getRanking(req: Request, res: Response) {
    const result = await battleRepository.getBattles();
    res.status(200).send({ fighters: result })
}


