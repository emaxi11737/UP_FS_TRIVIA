import Filter from '@domain/filter/Filter';
import Game from '@domain/game/Game';
import PaginationFilter from '@domain/pagination/PaginationFilter';

export default interface IGameRepository {
    create(game: Game): Promise<Game>;
    update(game: Game): Promise<Game>;
    read(gameId: string): Promise<Game>;
    list(pagination: PaginationFilter, filters?: Filter): Promise<Game[]>;
}
