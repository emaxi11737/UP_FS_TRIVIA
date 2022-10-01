import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IUserRepository from '@application/repositories/IUserRepository';
import CreateUserUseCase from '@application/usecases/user/create/CreateUserUseCase';
import UpdateUserUseCase from '@application/usecases/user/update/UpdateUserUseCase';
import DeleteUserUseCase from "@application/usecases/user/delete/DeleteUserUseCase";
import ReadUserUseCase from "@application/usecases/user/read/ReadUserUseCase";

@injectable()
export default class UserService {

    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) { }

    public getCreateUserUseCase() {
        return new CreateUserUseCase(this.userRepository);
    }

    public getUpdateUserUseCase() {
        return new UpdateUserUseCase(this.userRepository);
    }

    public getDeleteUserUseCase() {
        return new DeleteUserUseCase(this.userRepository);
    }

    public getReadUserUseCase() {
        return new ReadUserUseCase(this.userRepository);
    }
}
