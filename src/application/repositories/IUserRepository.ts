import User from '@domain/user/User';

export default interface IUserRepository {
    create(user: User): Promise<User>;
    read(id: string): Promise<User>;
    readByEmail(email: string): Promise<User>;
    update(user: User): Promise<User>;
}
