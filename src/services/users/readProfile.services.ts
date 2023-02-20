import { QueryConfig } from "pg"
import { client } from "../../databade"
import { iUserWithoutPassword, iUserResult } from "../../interfaces/users.interface"

const readProfileService = async (userId: number): Promise<iUserWithoutPassword> => {


    const queryString: string = `
        SELECT
            u."id",
            u."name",
            u."email",
            u."admin",
            u."active" 
        FROM
            users u
        WHERE  "id" = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResul: iUserResult = await client.query(queryConfig)

    return queryResul.rows[0]

}

export {
    readProfileService
}