import { inject, injectable } from "inversify";
import { TYPES } from "@constants/types";
import IUserRepository from "@application/repositories/IUserRepository";
import SignInUseCase from "@application/usecases/user/signin/SignInUseCase";

@injectable()
export default class AuthService {

    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

    public GetSignInUseCase() {
        return new SignInUseCase(this.userRepository);
    }
}
