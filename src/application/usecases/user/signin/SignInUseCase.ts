import md5 from 'md5';
import { validate } from 'class-validator';
import ISignInUseCase from '@application/usecases/user/signin/ISignInUseCase';
import ITokenDto from '@application/usecases/token/ITokenDto';
import IUserDto from '@application/usecases/user/IUserDto';
import IUserRepository from '@application/repositories/IUserRepository';
import ITokenRepository from '@application/repositories/ITokenRepository';
import User from '@domain/user/User';

export default class SignInUseCase implements ISignInUseCase {
    private userRepository: IUserRepository;
    private tokenRepository: ITokenRepository;

    constructor(
        userRepository: IUserRepository,
        tokenRepository: ITokenRepository
    ) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    public async signin(userDto: IUserDto): Promise<ITokenDto> {
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

        return await this.tokenRepository.create(userEntity);
    }
}
