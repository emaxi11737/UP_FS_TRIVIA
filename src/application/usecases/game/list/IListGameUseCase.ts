import IGameRankingDto from '@application/usecases/game/IGameRankingDto';

export default interface IListGameUseCase {
    list(): Promise<IGameRankingDto[]>;
}
