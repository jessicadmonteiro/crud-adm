import { iUserResult, iUserWithoutPassword } from "../../interfaces/users.interface"
import { client } from "../../databade"

const readUsersServices = async (): Promise<iUserWithoutPassword[]> => {

    const queryString: string = `
        SELECT
            u."id",
            u."name",
            u."email",
            u."admin",
            u."active" 
        FROM
            users u;
    `

    const queryResult:iUserResult = await client.query(queryString)

    return queryResult.rows
}

export {
    readUsersServices
}