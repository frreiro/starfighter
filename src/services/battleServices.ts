import axios, { AxiosResponse } from "axios";
import battleRepository from "../repositories/battleRepository.js";

async function getUserData(username: string) {
    try {
        const data = await axios.get(`https://api.github.com/users/${username}/repos`)
        return data.data.reduce((count: number, repo: any) => count + repo.stargazers_count, 0);
    } catch (e) {
        return null;
    }
}



async function compareStars(firstStars: number, secondStars: number, firstUser: string, secondUser: string) {
    if (firstStars === secondStars) return ({ winner: null, loser: null, draw: true })
    if (firstStars > secondStars) return ({ winner: firstUser, loser: secondUser, draw: false })
    if (firstStars < secondStars) return ({ winner: secondUser, loser: firstUser, draw: false })
}

async function insertBattle(battle: object, user1: string, user2: string) {
    const { winner, loser, draw }: { winner?: string, loser?: string, draw?: boolean } = battle;
    if (draw) {
        battleRepository.insertBattle("draws", user1);
        battleRepository.insertBattle("draws", user2);
    }
    else {
        battleRepository.insertBattle("wins", winner);
        battleRepository.insertBattle("losses", loser);
    }
}


export default { getUserData, compareStars, insertBattle }