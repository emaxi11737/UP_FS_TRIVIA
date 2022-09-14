import ITokenDto from '@application/usecases/token/ITokenDto';
import IUserDto from '@application/usecases/user/IUserDto';

export default interface ISignInUseCase {
    signin(userDto: IUserDto): Promise<ITokenDto>;
}
