export default interface ITokenDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    userId: string;
    username: string;
}
