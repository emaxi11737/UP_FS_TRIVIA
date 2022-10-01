import IUserDto from '@application/usecases/user/IUserDto';

export default interface IReadUserUseCase {
    read(userId: string): Promise<IUserDto>;
}
