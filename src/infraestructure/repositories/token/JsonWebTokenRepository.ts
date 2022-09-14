import { injectable } from 'inversify';
import Jwt from "jsonwebtoken";
import { validate } from 'class-validator';
import ITokenRepository from '@application/repositories/ITokenRepository';
import Token from '@domain/token/Token';
import User from '@domain/user/User';

@injectable()
export default class JsonWebTokenRepository implements ITokenRepository {
    private static readonly TOKEN_SECRET: string = process.env.SECRET_KEY;
    private static readonly REFRESH_TOKEN_SECRET: string = process.env.REFRESH_SECRET_KEY;
    private static readonly TOKEN_EXPIRES: number = 1800;
    private static readonly REFRESH_TOKEN_EXPIRES: number = 1;

    constructor() { }

    public async create(user: User): Promise<Token> {
        const accessToken = Jwt.sign({ userId: user.id }, JsonWebTokenRepository.TOKEN_SECRET, { expiresIn: `${JsonWebTokenRepository.TOKEN_EXPIRES}s`, algorithm: 'HS256' });
        const refreshToken = Jwt.sign({ userId: user.id }, JsonWebTokenRepository.REFRESH_TOKEN_SECRET, { expiresIn: `${JsonWebTokenRepository.REFRESH_TOKEN_EXPIRES}d`, algorithm: 'HS256' });

        const tokenEntity = new Token(
            accessToken,
            refreshToken,
            JsonWebTokenRepository.TOKEN_EXPIRES
        );

        const errors = await validate(tokenEntity);
        if (errors.length > 0) throw Error("Please, check token params");

        return tokenEntity;
    }

    public async refresh(user: User, refreshToken: string): Promise<Token> {
        const checkRefreshToken = await this.verifyRefreshToken(refreshToken);
        if (checkRefreshToken) throw Error("Invalid refresh token");

        const accessToken = Jwt.sign({ userId: user.id }, JsonWebTokenRepository.TOKEN_SECRET, { expiresIn: `${JsonWebTokenRepository.TOKEN_EXPIRES}s` });
        const tokenEntity = new Token(
            accessToken,
            refreshToken,
            JsonWebTokenRepository.TOKEN_EXPIRES
        );

        const errors = await validate(tokenEntity);
        if (errors.length > 0) throw Error("Please, check token params");

        return tokenEntity;
    }

    public async verifyAccessToken(accessToken: string): Promise<boolean> {
        return new Promise((resolve) => {
            Jwt.verify(accessToken, JsonWebTokenRepository.TOKEN_SECRET,
                (err) => {
                    if (err) resolve(false);
                    return resolve(true);
                });
        });
    }

    public async verifyRefreshToken(refreshToken: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Jwt.verify(refreshToken, JsonWebTokenRepository.REFRESH_TOKEN_SECRET,
                (err) => {
                    if (err) resolve(false);
                    return resolve(true);
                });
        });
    }
}
