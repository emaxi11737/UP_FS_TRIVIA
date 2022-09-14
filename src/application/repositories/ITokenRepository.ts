import Token from '@domain/token/Token';
import User from '@domain/user/User';

export default interface ITokenRepository {
    create(user: User): Promise<Token>;
    refresh(user: User, refreshToken: string): Promise<Token>;
    verifyAccessToken(accessToken: string): Promise<boolean>;
    verifyRefreshToken(refreshToken: string): Promise<boolean>;
}
