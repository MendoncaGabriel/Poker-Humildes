import { genSalt, hash} from "bcrypt"
import { UserCreate, UserRepository } from "../repository/user-repository";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(user: UserCreate) {
        const salt = await genSalt(10);
        const passwordHash = await hash(user.password, salt)
        user.password = passwordHash

        await this.userRepository.create({
            user
        })
    }
}