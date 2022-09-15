import IVerifyTokenUseCase from '@application/usecases/token/verify/IVerifyTokenUseCase';
import ITokenRepository from '@application/repositories/ITokenRepository';

export default class VerifyTokenUseCase implements IVerifyTokenUseCase {

    private tokenRepository: ITokenRepository;

    constructor(tokenRepository: ITokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public async verify(token: string): Promise<boolean> {
        return await this.tokenRepository.verifyAccessToken(token);
    }
}
