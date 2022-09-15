import IRefreshTokenUseCase from '@application/usecases/token/refresh/IRefreshTokenUseCase';
import ITokenRepository from '@application/repositories/ITokenRepository';
import ITokenDto from '@application/usecases/token/ITokenDto';
import RefreshToken from '@domain/token/RefreshToken';

export default class RefreshTokenUseCase implements IRefreshTokenUseCase {

    private tokenRepository: ITokenRepository;

    constructor(tokenRepository: ITokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public async refresh(refreshToken: string): Promise<ITokenDto> {
        const refreshTokenEntity = new RefreshToken(refreshToken);

        const checkRefreshToken = await this.tokenRepository.verifyRefreshToken(refreshTokenEntity.refreshToken);
        if (!checkRefreshToken) throw Error("Invalid refresh token");

        const userEntity = await this.tokenRepository.decodeToken(refreshToken);
        return await this.tokenRepository.create(userEntity);
    }
}
