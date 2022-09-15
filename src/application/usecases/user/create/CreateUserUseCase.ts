import md5 from 'md5';
import { validate } from "class-validator";
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
        const userEntity = new User(
            userDto.id,
            userDto.username,
            userDto.password && md5(String(userDto.password)),
            userDto.email,
            userDto.createdAt,
            userDto.updatedAt,
            userDto.deletedAt,
        );

        const errors = await validate(userEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const userExist = await this.userRepository.readByEmail(userEntity.email)
            .catch((error) => console.error(error));

        if (!!userExist) throw Error("User exist");

        return await this.userRepository.create(userEntity);
    }
}
