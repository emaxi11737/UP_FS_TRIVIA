import IUserDto from '@application/usecases/user/IUserDto';
import User from '@domain/user/User';

export default class UserMongoDBMapper {

    public static toEntity(userMapper: IUserDto): User {
        const { id, username, password, email, createdAt, updatedAt } = userMapper;

        const userEntity = new User(id, username, password, email, createdAt, updatedAt);

        return userEntity;
    }
}
