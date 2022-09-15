import ITokenDto from '@application/usecases/token/ITokenDto';

export default interface IRefreshTokenUseCase {
    refresh(refreshToken: string): Promise<ITokenDto>;
}
