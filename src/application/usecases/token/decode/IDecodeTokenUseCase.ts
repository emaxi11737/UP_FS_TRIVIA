import IUserDto from '@application/usecases/user/IUserDto';

export default interface IDecodeTokenUseCase {
    decode(token: string): Promise<IUserDto>;
}
