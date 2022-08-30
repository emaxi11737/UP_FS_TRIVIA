import { validate } from "class-validator";
import md5 from 'md5';
import IUserDto from '@application/usecases/user/IUserDto';
import ICreateUserUseCase from '@application/usecases/user/create/ICreateUserUseCase';
import IUserRepository from '@application/repositories/IUserRepository';
import User from '@domain/user/User';

export default class CreateUserUseCase implements ICreateUserUseCase {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async create(userDto: IUserDto): Promise<IUserDto> {
        userDto.password = md5(userDto.password || "");

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

        return await this.userRepository.create(userEntity);
    }
}
