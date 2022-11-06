import ITokenRepository from "../../src/application/repositories/ITokenRepository";
import User from "../../src/domain/user/User";
import Token from "../../src/domain/token/Token";
import md5 from "md5";


export default class FakeTokenRepository implements ITokenRepository {

    public tokens = [{
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjQ1MzhiMjZhODc3NTczZTk0MDNlYSIsInVzZXJuYW1lIjoicHJ1ZWJhIiwicGFzc3dvcmQiOiJmYTVhMDJjOWNjMTgzYjNmZjFiZmNkNGMyMjQzZjg1YyIsImVtYWlsIjoicHJ1ZWJhQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwiaWF0IjoxNjY3NTE5NDAwLCJleHAiOjE2Njc1MjEyMDB9.esFLVD3Rc20MgAXe2GE_dzwQgT8jdplqsmMPlaj0vJE",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjQ1MzhiMjZhODc3NTczZTk0MDNlYSIsInVzZXJuYW1lIjoicHJ1ZWJhIiwicGFzc3dvcmQiOiJmYTVhMDJjOWNjMTgzYjNmZjFiZmNkNGMyMjQzZjg1YyIsImVtYWlsIjoicHJ1ZWJhQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwiaWF0IjoxNjY3NTE5NDAwLCJleHAiOjE2Njc2MDU4MDB9.38YgdBWYQriT1U-cvAT84twT_KYGTeU8Z5qODfXYQys",
        expiresIn: 1800
    },
    {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjQ1MzhiMjZhODc3NTczZTk0MDNlYSIsInVzZXJuYW1lIjoicHJ1ZWJhIiwicGFzc3dvcmQiOiJmYTVhMDJjOWNjMTgzYjNmZjFiZmNkNGMyMjQzZjg1YyIsImVtYWlsIjoicHJ1ZWJhQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwiaWF0IjoxNjY3NTE5NTY3LCJleHAiOjE2Njc1MjEzNjd9.Q9HkujGaSba-u6AaDINJinY7cCSPWw9ElBbBEwh7Nq8",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjQ1MzhiMjZhODc3NTczZTk0MDNlYSIsInVzZXJuYW1lIjoicHJ1ZWJhIiwicGFzc3dvcmQiOiJmYTVhMDJjOWNjMTgzYjNmZjFiZmNkNGMyMjQzZjg1YyIsImVtYWlsIjoicHJ1ZWJhQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwiaWF0IjoxNjY3NTE5NTY3LCJleHAiOjE2Njc2MDU5Njd9.BZs8WSYWryahY7zCjZgvzfK8k2mUvRVNrygYhkQRnJU",
        expiresIn: 1800
    },
    {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjQ1MzhiMjZhODc3NTczZTk0MDNlYSIsInVzZXJuYW1lIjoicHJ1ZWJhIiwicGFzc3dvcmQiOiJmYTVhMDJjOWNjMTgzYjNmZjFiZmNkNGMyMjQzZjg1YyIsImVtYWlsIjoicHJ1ZWJhQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwiaWF0IjoxNjY3NTE5NjAxLCJleHAiOjE2Njc1MjE0MDF9.N_vxdxxUMalnvpgfSUrBCCnAQKipHyqz6sIJnSsT774",
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjQ1MzhiMjZhODc3NTczZTk0MDNlYSIsInVzZXJuYW1lIjoicHJ1ZWJhIiwicGFzc3dvcmQiOiJmYTVhMDJjOWNjMTgzYjNmZjFiZmNkNGMyMjQzZjg1YyIsImVtYWlsIjoicHJ1ZWJhQGdtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiY3JlYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMS0wM1QyMzo0OTozMS40MjZaIiwiaWF0IjoxNjY3NTE5NjAxLCJleHAiOjE2Njc2MDYwMDF9.pkPJrTELOYlpJ4pg2lu7WaYNkaOKOTVDzhy7VzoZFjA",
        expiresIn: 1800
    }];

    public user = {
        id: "5ed8240576820810650d8f61",
        username: "test.test",
        email: "test@test.com",
        password: md5("1234"),
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    };

    public async create(user: User): Promise<Token> {
        return this.tokens[0];
    }
    public async refresh(user: User, refreshToken: string): Promise<Token> {
        const isEmpty = Object.values(user).every(x => x === null || x === '');
        if (isEmpty) throw Error("Empty User");
        const refreshTokenExist = await this.tokens.find((tokenList) => tokenList.refreshToken === refreshToken);
        if (refreshTokenExist?.accessToken != refreshToken) throw Error("Invalid Access Token");

        return refreshTokenExist;

    }
    public async verifyAccessToken(accessToken: string): Promise<boolean> {
        const accessTokenExist = await this.tokens.find((tokenList) => tokenList.accessToken === accessToken);

        if (accessTokenExist?.accessToken != accessToken) throw Error("Invalid Access Token");

        return accessTokenExist?.accessToken == accessToken;
    }
    public async verifyRefreshToken(refreshToken: string): Promise<boolean> {
        const refreshTokenExist = await this.tokens.find((tokenList) => tokenList.refreshToken === refreshToken);
        if (refreshTokenExist?.refreshToken != refreshToken) throw Error("Invalid Access Token");

        return refreshTokenExist?.refreshToken == refreshToken;
    }
    public async decodeToken(token: string): Promise<User> {
        const refreshTokenExist = await this.tokens.find((tokenList) => tokenList.refreshToken === token);
        if (refreshTokenExist?.refreshToken != token) throw Error("Invalid Access Token");
        return this.user;
    }


}
