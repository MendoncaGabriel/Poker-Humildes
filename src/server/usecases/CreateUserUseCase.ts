
import { UserCreate, UserRepository } from "../repository/user-repository";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(user: UserCreate) {
        await this.userRepository.create({
            user
        })
    }
}