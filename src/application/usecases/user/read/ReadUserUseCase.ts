import { validate } from 'class-validator';
import IReadUserUseCase from '@application/usecases/user/read/IReadUserUseCase';
import IUserDto from '@application/usecases/user/IUserDto';
import IUserRepository from '@application/repositories/IUserRepository';
import UserRead from '@domain/user/UserRead';

export default class ReadUserUseCase implements IReadUserUseCase {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async read(userId: string): Promise<IUserDto> {
        const userReadEntity = new UserRead(
            userId,
        );

        const errors = await validate(userReadEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        return await this.userRepository.read(userReadEntity.id);
    }
}
