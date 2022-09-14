import { inject, injectable } from "inversify";
import { TYPES } from "@constants/types";
import IUserRepository from "@application/repositories/IUserRepository";
import SignInUseCase from "@application/usecases/user/signin/SignInUseCase";
import ITokenRepository from "@application/repositories/ITokenRepository";

@injectable()
export default class AuthService {

    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ITokenRepository) private tokenRepository: ITokenRepository
    ) { }

    public GetSignInUseCase() {
        return new SignInUseCase(this.userRepository, this.tokenRepository);
    }
}
