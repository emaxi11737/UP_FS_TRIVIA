import IUserDto from '@application/usecases/user/IUserDto';

export default interface ICreateUserUseCase {
    create(userDto: IUserDto): Promise<IUserDto>;
}
