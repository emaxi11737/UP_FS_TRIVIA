import IListGameUseCase from '@application/usecases/game/list/IListGameUseCase';
import IGameRankingDto from '@application/usecases/game/IGameRankingDto';
import IGameRepository from '@application/repositories/IGameRepository';
import PaginationFilter from '@domain/pagination/PaginationFilter';
import { PAGINATION } from '@constants/pagination';
import IUserRepository from '@application/repositories/IUserRepository';
import GameRanking from '@domain/game/GameRanking';

export default class ListGameUseCase implements IListGameUseCase {

    private gameRepository: IGameRepository;
    private userRepository: IUserRepository;

    constructor(
        gameRepository: IGameRepository,
        userRepository: IUserRepository
    ) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    public async list(): Promise<IGameRankingDto[]> {
        const pagination = new PaginationFilter(PAGINATION.LIMIT, PAGINATION.PAGE);
        const lastGames = await this.gameRepository.list(pagination);

        let gameRankingList: IGameRankingDto[] = [];

        for (let game of lastGames) {
            const user = await this.userRepository.read(game.userId);
            const gameRankingEntity = new GameRanking(
                game.id,
                user.username,
                game.score,
                game.level,
                game.createdAt,
                game.updatedAt
            );

            gameRankingList.push(gameRankingEntity);
        };
        return gameRankingList;
    }
}
