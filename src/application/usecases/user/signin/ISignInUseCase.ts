import ITokenDto from '@application/usecases/token/ITokenDto';
import IUserSignInDto from '@application/usecases/user/IUserSignInDto';

export default interface ISignInUseCase {
    signin(userDto: IUserSignInDto): Promise<ITokenDto>;
}
