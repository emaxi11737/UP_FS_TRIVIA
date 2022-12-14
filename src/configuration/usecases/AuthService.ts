import { inject, injectable } from "inversify";
import { TYPES } from "@constants/types";
import IUserRepository from "@application/repositories/IUserRepository";
import SignInUseCase from "@application/usecases/user/signin/SignInUseCase";
import ITokenRepository from "@application/repositories/ITokenRepository";
import RefreshTokenUseCase from "@application/usecases/token/refresh/RefreshTokenUseCase";
import VerifyTokenUseCase from "@application/usecases/token/verify/VerifyTokenUseCase";
import DecodeTokenUseCase from "@application/usecases/token/decode/DecodeTokenUseCase";

@injectable()
export default class AuthService {

    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ITokenRepository) private tokenRepository: ITokenRepository
    ) { }

    public GetSignInUseCase() {
        return new SignInUseCase(this.userRepository, this.tokenRepository);
    }

    public GetRefreshTokenUseCase() {
        return new RefreshTokenUseCase(this.tokenRepository);
    }

    public GetVerifyTokenUseCase() {
        return new VerifyTokenUseCase(this.tokenRepository);
    }

    public GetDecodeTokenUseCase() {
        return new DecodeTokenUseCase(this.tokenRepository);
    }
}
