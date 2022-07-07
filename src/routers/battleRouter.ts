import { Router } from "express";
import { fightUsers, getRanking } from "../controllers/battleController.js";
import { usernamesValidate } from "../middlewares/battleMiddleware.js";

const battleRouter = Router();

battleRouter.post("/battle", usernamesValidate, fightUsers)
battleRouter.get("/ranking", getRanking)


export default battleRouter