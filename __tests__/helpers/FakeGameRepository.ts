import IGameRepository from "../../src/application/repositories/IGameRepository";
import Game from "../../src/domain/game/Game";
import PaginationFilter from '../../src/domain/pagination/PaginationFilter';

export default class FakeGameRepository implements IGameRepository {
    public games = [{
        id: "5ed8240576820810650d8j21",
        userId: "5ed8240576820810650d8f61",
        score: 100,
        level: 1,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    },
    {
        id: "5ed8240576820810650d8fm12",
        userId: "5ed8240576820810650d8f61",
        score: 90,
        level: 1,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z")
    },
    {
        id: "5ed8240576820810650d8fn12",
        userId: "5ed8240576820810650d8f61",
        score: 40,
        level: 1,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    }];
    public async create(game: Game): Promise<Game> {
        return game;
    }
    public async update(game: Game): Promise<Game> {
        const gameObject = this.games.find((gameList) => gameList.id === game.id);

        if (!gameObject) throw Error("Game not found");

        return game;
    }
    public async read(gameId: string): Promise<Game> {
        const gameObject = this.games.find((gameList) => gameList.id === gameId);

        if (!gameObject) throw Error("Game not found");

        return gameObject;
    }
    public async list(pagination: PaginationFilter, filters?: any): Promise<Game[]> {
        const gamesResults = this.games;

        return gamesResults;
    }


}
