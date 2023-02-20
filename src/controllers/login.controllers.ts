import { Request, Response } from "express"
import { createLoginService } from "../services/Login/createLogin.services"

const createLoginControllers = async (req: Request, res: Response): Promise<Response> => {

    const token = await createLoginService(req.body)

    return res.json({
        token: token
    })
} 

export {
    createLoginControllers
}