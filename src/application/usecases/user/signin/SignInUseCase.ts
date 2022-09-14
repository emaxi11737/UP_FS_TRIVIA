import md5 from 'md5';
import { validate } from 'class-validator';
import Jwt from "jsonwebtoken";
import ISignInUseCase from '@application/usecases/user/signin/ISignInUseCase';
import IUserDto from '@application/usecases/user/IUserDto';
import IUserRepository from '@application/repositories/IUserRepository';
import User from '@domain/user/User';

export default class SignInUseCase implements ISignInUseCase {
    private static readonly TOKEN_SECRET: string = process.env.SECRET_KEY;
    private static readonly TOKEN_EXPIRES: string = '1800s';

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

        // TODO
        console.log(this.generateAccessToken(user));

        return user;
    }

    private generateAccessToken(user: User) {
        console.log(SignInUseCase.TOKEN_SECRET, SignInUseCase.TOKEN_EXPIRES, JSON.stringify(user))
        return Jwt.sign({ id: user.id }, SignInUseCase.TOKEN_SECRET, { expiresIn: SignInUseCase.TOKEN_EXPIRES });
    }
}
