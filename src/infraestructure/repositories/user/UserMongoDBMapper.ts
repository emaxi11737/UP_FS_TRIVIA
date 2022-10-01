import IUserDto from '@application/usecases/user/IUserDto';
import User from '@domain/user/User';

export default class UserMongoDBMapper {

    public static toEntity(userMapper: IUserDto): User {
        const { id, username, password, email, roles, createdAt, updatedAt, deletedAt } = userMapper;

        const userEntity = new User(id, username, password, email, createdAt, updatedAt, deletedAt, roles);

        return userEntity;
    }
}
