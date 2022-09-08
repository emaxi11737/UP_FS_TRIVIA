import { validate } from 'class-validator';
import IDeleteUserUseCase from '@application/usecases/user/delete/IDeleteUserUseCase';
import IUserRepository from '@application/repositories/IUserRepository';
import UserPatch from '@domain/user/UserPatch';

export default class DeleteUserUseCase implements IDeleteUserUseCase {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async delete(userId: string): Promise<void> {
        const userPatchEntity = new UserPatch(
            userId,
            undefined,
            undefined,
            undefined
        );

        const errors = await validate(userPatchEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const user = await this.userRepository.read(userId);
        user.deletedAt = new Date();

        await this.userRepository.update(user);
    }
}
