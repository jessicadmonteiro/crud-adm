import format from "pg-format"
import { client } from "../../databade"
import { iUserResult, iUserRquest, iUserWithoutPassword } from "../../interfaces/users.interface"

const createUserService = async(userData: iUserRquest): Promise<iUserWithoutPassword> => {
   
    const queryString: string = format(`
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING id, name, email, admin, active;
    `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: iUserResult = await client.query(queryString)
    
    return queryResult.rows[0]
}

export default createUserService