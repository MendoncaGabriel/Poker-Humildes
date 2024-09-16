export interface UserCreate {
    username: string,
    email: string,
    passwordHash: string
}

export interface UserRepository {
    create({user}:{user: UserCreate}): void
}