import md5 from 'md5';
import { validate } from 'class-validator';
import ISignInUseCase from '@application/usecases/user/signin/ISignInUseCase';
import ITokenDto from '@application/usecases/token/ITokenDto';
import IUserSignInDto from '@application/usecases/user/IUserSignInDto';
import IUserRepository from '@application/repositories/IUserRepository';
import ITokenRepository from '@application/repositories/ITokenRepository';
import UserSignIn from '@domain/user/UserSignIn';

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

    public async signin(userDto: IUserSignInDto): Promise<ITokenDto> {
        const userEntity = new UserSignIn(
            userDto.password && md5(String(userDto.password)),
            userDto.email
        );

        const errors = await validate(userEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const user = await this.userRepository.readByEmail(userEntity.email);
        if (user.password !== userEntity.password) throw Error("Invalid password");

        return await this.tokenRepository.create(user);
    }
}
