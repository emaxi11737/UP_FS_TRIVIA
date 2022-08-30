import { validate } from 'class-validator';
import IUpdateUserUseCase from '@application/usecases/user/update/IUpdateUserUseCase';
import IUserDto from '@application/usecases/user/IUserDto';
import IUserPatchDto from '@application/usecases/user/IUserPatchDto';
import IUserRepository from '@application/repositories/IUserRepository';
import UserPatch from '@domain/user/UserPatch';

export default class UpdateUserUseCase implements IUpdateUserUseCase {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async updatePartial(userDto: IUserPatchDto): Promise<IUserDto> {
        const userPatchEntity = new UserPatch(
            userDto.id,
            userDto.email,
        );

        const errors = await validate(userPatchEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        return await this.userRepository.updatePartial(userPatchEntity);
    }
}
