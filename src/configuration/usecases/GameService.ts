import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import IGameRepository from '@application/repositories/IGameRepository';
import CreateGameUseCase from "@application/usecases/game/create/CreateGameUseCase";
import UpdateGameUseCase from "@application/usecases/game/update/UpdateGameUseCase";
import ReadGameUseCase from "@application/usecases/game/read/ReadGameUseCase";
import IUserRepository from "@application/repositories/IUserRepository";
import ListGameUseCase from "@application/usecases/game/list/ListGameUseCase";

@injectable()
export default class GameService {

    constructor(
        @inject(TYPES.IGameRepository) private gameRepository: IGameRepository,
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository
    ) { }

    public getCreateGameUseCase() {
        return new CreateGameUseCase(this.gameRepository, this.userRepository);
    }

    public getUpdateGameUseCase() {
        return new UpdateGameUseCase(this.gameRepository);
    }

    public getReadGameUseCase() {
        return new ReadGameUseCase(this.gameRepository);
    }

    public getListGameUseCase() {
        return new ListGameUseCase(this.gameRepository, this.userRepository);
    }
}
