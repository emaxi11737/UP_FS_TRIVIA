import IUserDto from '@application/usecases/user/IUserDto';

export default interface ISignInUseCase {
    signin(userDto: IUserDto): Promise<IUserDto>;
}
