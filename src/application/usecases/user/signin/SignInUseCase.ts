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
            userDto.password,
            userDto.email,
            userDto.createdAt,
            userDto.updatedAt,
        );

        const errors = await validate(userEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        return await this.userRepository.read(userEntity);
    }
}
