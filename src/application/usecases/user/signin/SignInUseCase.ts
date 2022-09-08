import md5 from 'md5';
import { validate } from 'class-validator';
import ISignInUseCase from '@application/usecases/user/signin/ISignInUseCase';
import IUserDto from '@application/usecases/user/IUserDto';
import IUserRepository from '@application/repositories/IUserRepository';
import User from '@domain/user/User';

export default class SignInUseCase implements ISignInUseCase {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async signin(userDto: IUserDto): Promise<IUserDto> {
        const userEntity = new User(
            userDto.id,
            userDto.username,
            userDto.password && md5(userDto.password),
            userDto.email,
            userDto.createdAt,
            userDto.updatedAt,
            userDto.deletedAt
        );

        const errors = await validate(userEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const user = await this.userRepository.readByEmail(userEntity.email);
        if (user.password !== userEntity.password) throw Error("Invalid password");

        return user;
    }
}
