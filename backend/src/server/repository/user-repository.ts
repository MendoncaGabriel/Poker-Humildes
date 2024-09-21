export interface UserCreate {
    username: string,
    email: string,
    password: string
}

export interface UserRepository {
    create({user}:{user: UserCreate}): Promise<void>
}