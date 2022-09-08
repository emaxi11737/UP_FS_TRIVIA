import IGameDto from '@application/usecases/game/IGameDto';
import Game from '@domain/game/Game';

export default class GameMongoDBMapper {

    public static toEntity(gameMapper: IGameDto): Game {
        const { id, userId, score, level, createdAt, updatedAt } = gameMapper;

        const gameEntity = new Game(id, userId, score, level, createdAt, updatedAt);

        return gameEntity;
    }
}
