import md5 from 'md5';
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
            userDto.username,
            userDto.oldPassword && md5(userDto.oldPassword),
            userDto.newPassword && md5(userDto.newPassword)
        );

        const errors = await validate(userPatchEntity);
        if (errors.length > 0) throw Error("Please, check input params");
        const user = await this.userRepository.read(userDto.id);

        if (!!userPatchEntity.oldPassword && user.password !== userPatchEntity.oldPassword) throw Error("Invalid password");
        if (!userPatchEntity.oldPassword && !!userPatchEntity.newPassword) throw Error("Old password required");
        if (!!userPatchEntity.oldPassword && !userPatchEntity.newPassword) throw Error("New password required");

        if (!!userPatchEntity.username) user.username = userPatchEntity.username;
        if (!!userPatchEntity.newPassword) user.password = userPatchEntity.newPassword;

        return await this.userRepository.update(user);
    }
}
