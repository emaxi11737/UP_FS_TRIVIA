import IGameDto from '@application/usecases/game/IGameDto';

export default interface ICreateGameUseCase {
    create(gameDto: IGameDto): Promise<IGameDto>;
}
