import IRefreshTokenUseCase from '@application/usecases/token/refresh/IRefreshTokenUseCase';
import ITokenRepository from '@application/repositories/ITokenRepository';
import ITokenDto from '@application/usecases/token/ITokenDto';
import RefreshToken from '@domain/token/RefreshToken';
import TokenFilter from '@domain/token/TokenFilter';
import { validate } from 'class-validator';

export default class RefreshTokenUseCase implements IRefreshTokenUseCase {

    private tokenRepository: ITokenRepository;

    constructor(tokenRepository: ITokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public async refresh(refreshToken: string): Promise<ITokenDto> {

        const tokenFilter = new TokenFilter(refreshToken);
        const errors = await validate(tokenFilter);
        if (errors.length > 0) throw Error("Please, check input params");


        const refreshTokenEntity = new RefreshToken(refreshToken);

        const checkRefreshToken = await this.tokenRepository.verifyRefreshToken(refreshTokenEntity.refreshToken);
        if (!checkRefreshToken) throw Error("Invalid refresh token");

        const userEntity = await this.tokenRepository.decodeToken(refreshToken);
        return await this.tokenRepository.create(userEntity);
    }
}
