import IUserDto from '@application/usecases/user/IUserDto';
import IUserPatchDto from '@application/usecases/user/IUserPatchDto';

export default interface IUpdateUserUseCase {
    updatePartial(userDto: IUserPatchDto): Promise<IUserDto>;
}
