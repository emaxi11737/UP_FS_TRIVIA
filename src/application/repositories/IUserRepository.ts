import User from '@domain/user/User';
import UserPatch from '@domain/user/UserPatch';

export default interface IUserRepository {
    create(user: User): Promise<User>;
    read(user: User): Promise<User>;
    updatePartial(user: UserPatch): Promise<User>;
}
