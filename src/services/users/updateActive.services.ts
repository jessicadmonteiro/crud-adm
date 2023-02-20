import { QueryConfig } from "pg"
import { client } from "../../databade"
import format from "pg-format"
import {iUserWithoutPassword, iUserResult} from "../../interfaces/users.interface"
import { AppError } from "../../error"


const updateActiveService =  async (userId: number): Promise<iUserWithoutPassword> =>{

    const queryActive: string = `
        SELECT
            *
        FROM
            users
        WHERE 
            "id" = $1;
    `

    const queeryConfigActive: QueryConfig = {
        text: queryActive,
        values: [userId]
    }

    const queryResultActive = await client.query(queeryConfigActive)
    const active = queryResultActive.rows[0].active

    if(active){
        throw new AppError("User already active", 400)
    }

    const queryString: string = format(`
        UPDATE 
            users 
        SET
            "active" = true
        WHERE 
            "id"= $1
        RETURNING id, name, email, admin, active;
    `
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: iUserResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export {
    updateActiveService
}
