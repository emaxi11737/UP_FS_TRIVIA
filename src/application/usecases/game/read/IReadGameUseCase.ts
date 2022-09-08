import IGameDto from '@application/usecases/game/IGameDto';

export default interface IReadGameUseCase {
    read(gameId: string): Promise<IGameDto>;
}
