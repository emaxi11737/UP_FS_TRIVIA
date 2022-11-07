import User from '@domain/user/User';

export default interface IUserRepository {
    create(user: User): Promise<User>;
    read(userId: string): Promise<User>;
    readByEmail(email: string): Promise<User | undefined>;
    update(user: User): Promise<User>;
}
