import IGameRankingDto from '@application/usecases/game/IGameRankingDto';

export default interface RankingGameUseCase {
    ranking(): Promise<IGameRankingDto[]>;
}
