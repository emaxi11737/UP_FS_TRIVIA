import Game from '@domain/game/Game';

export default interface IGameRepository {
    create(game: Game): Promise<Game>;
    update(game: Game): Promise<Game>;
    read(gameId: string): Promise<Game>;
}
