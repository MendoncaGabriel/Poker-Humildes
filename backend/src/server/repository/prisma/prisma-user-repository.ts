import { Prisma } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { db } from "../../config/database";

export class PrismaUserRepository implements UserRepository {
    async create(
        { user }: 
        { user: Prisma.UserCreateInput }
    ): Promise<void> {
        await db.user.create({
            data: user
            
        })
    }   
}