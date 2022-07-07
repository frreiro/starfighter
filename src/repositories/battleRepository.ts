import connection from "../../database.js";


async function insertBattle(type: string, username: string) {
    let insertType = "0,0,0"
    if (type === "wins") insertType = "1,0,0"
    if (type === "losses") insertType = "0,1,0"
    if (type === "draws") insertType = "0,0,1"

    await connection.query(`
    UPDATE fighters SET ${type} = ${type} + 1 WHERE username = $1`
        , [username])
    await connection.query(`
    INSERT INTO fighters (username, wins, losses, draws) 
    SELECT $1, ${insertType} 
    WHERE NOT EXISTS (SELECT username FROM fighters WHERE username = $1 )`
        , [username])
}


async function getBattles() {
    const { rows } = await connection.query(`SELECT username,wins,losses,draws FROM fighters ORDER BY wins DESC,draws DESC`)
    return rows;
}

export default { insertBattle, getBattles }