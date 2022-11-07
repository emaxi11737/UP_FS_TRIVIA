import IVerifyTokenUseCase from '@application/usecases/token/verify/IVerifyTokenUseCase';
import ITokenRepository from '@application/repositories/ITokenRepository';
import TokenFilter from '@domain/token/TokenFilter';
import { validate } from 'class-validator';

export default class VerifyTokenUseCase implements IVerifyTokenUseCase {

    private tokenRepository: ITokenRepository;

    constructor(tokenRepository: ITokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public async verify(token: string): Promise<boolean> {
        const tokenFilter = new TokenFilter(token);

        const errors = await validate(tokenFilter);
        if (errors.length > 0) return false;

        return await this.tokenRepository.verifyAccessToken(token);
    }
}
