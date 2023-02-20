import { QueryConfig } from "pg"
import {iUserWithoutPassword, iUserResult} from "../../interfaces/users.interface"
import { client } from "../../databade"
import format from "pg-format"

const updateUserService = async (userId: number, userData: iUserWithoutPassword) => {

    const queryUser: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `
    const queryUserConfig: QueryConfig = {
        text: queryUser,
        values: [userId]
    }

    const queryUserResult: iUserResult = await client.query(queryUserConfig)

    const necessaryData = {
        name: userData.name || queryUserResult.rows[0].name,
        email: userData.email || queryUserResult.rows[0].email,
    }


    const queryString: string = format(`
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING id, name, email, admin, active;    
    `,
        Object.keys(necessaryData),
        Object.values(necessaryData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    } 

    const queryResult: iUserResult = await client.query(queryConfig)
    
    return queryResult.rows[0]
}

export{
    updateUserService
}