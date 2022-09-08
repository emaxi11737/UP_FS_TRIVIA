import IGameDto from '@application/usecases/game/IGameDto';
import IGamePatchDto from '@application/usecases/game/IGamePatchDto';

export default interface IUpdateGameUseCase {
    updatePartial(gameDto: IGamePatchDto): Promise<IGameDto>;
}
