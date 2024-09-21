import { Request, Response } from "express";
import { PrismaUserRepository } from "../../../repository/prisma/prisma-user-repository";
import { CreateUserUseCase } from "../../../usecases/CreateUserUseCase";
import { z } from "zod";

const userRepository = new PrismaUserRepository
const userUsecase = new CreateUserUseCase(userRepository)

const UserRequestBody = z.object({
    username: z.string().min(1, 'Nome muito Pequeno').max(50, 'Nome muito grande'),
    email: z.string().email(),
    password: z.string().min(1, 'Senha muito pequena').max(50, 'Senha muito grande')
})

export class RegisterController {
    async handle(req: Request, _res: Response) {
        
        const { email, password, username } = UserRequestBody.parse(req.body)
        await userUsecase.execute({
            email, username, password,
        })
    }
}