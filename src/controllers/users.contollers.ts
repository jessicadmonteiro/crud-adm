import { Request, Response } from "express"
import createUserService from "../services/users/createUsers.services"
import {iUserRquest, iUserWithoutPassword} from "../interfaces/users.interface"
import { readUsersServices } from "../services/users/readUsers.services"
import {readProfileService} from "../services/users/readProfile.services"
import {deleteUserService } from "../services/users/deleteUser.services"
import {updateActiveService} from "../services/users/updateActive.services"
import {updateUserService} from "../services/users/updateUser.services"

const createUsersController = async (req: Request, res: Response): Promise<Response >=> {

    const userData: iUserRquest = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const readUserController = async (req:Request, res: Response): Promise<Response> => {
   
   const users = await readUsersServices()
    return res.json(users)
}

const readProfileController = async (req: Request, res: Response): Promise<Response> => {
    
    const userId: number = req.user.id

    const user = await  readProfileService(userId)

    return res.json(user)
}

const updateUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId: number = parseInt(req.params.id)
    const userData: iUserWithoutPassword = req.body

    const user = await updateUserService(userId, userData)

    return res.json(user)
}

const deleteUserController = async (req: Request, res: Response): Promise<Response> =>{
    const userId: number = parseInt(req.params.id)

    await deleteUserService(userId)

    return res.status(204).send()
}

const updateActiveController = async (req: Request, res: Response): Promise<Response> => {
    
    const userId: number = parseInt(req.params.id)

    const user = await updateActiveService(userId)

    return res.json(user)
}

export { 
    createUsersController,
    readUserController,
    readProfileController,
    updateUserController,
    deleteUserController,
    updateActiveController
}