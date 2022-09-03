import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IUserRepository from '@application/repositories/IUserRepository';
import CreateUserUseCase from '@application/usecases/user/create/CreateUserUseCase';
import UpdateUserUseCase from '@application/usecases/user/update/UpdateUserUseCase';

@injectable()
export default class UserService {

    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

    public getCreateUserUseCase() {
        return new CreateUserUseCase(this.userRepository);
    }

    public getUpdateUserUseCase() {
        return new UpdateUserUseCase(this.userRepository);
    }
}