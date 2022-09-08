import { validate } from "class-validator";
import ICreateGameUseCase from '@application/usecases/game/create/ICreateGameUseCase';
import IGameRepository from '@application/repositories/IGameRepository';
import IGameDto from "@application/usecases/game/IGameDto";
import Game from "@domain/game/Game";

export default class CreateGameUseCase implements ICreateGameUseCase {

    private gameRepository: IGameRepository;

    constructor(gameRepository: IGameRepository) {
        this.gameRepository = gameRepository;
    }

    public async create(gameDto: IGameDto): Promise<IGameDto> {
        const gameEntity = new Game(
            gameDto.id,
            gameDto.userId,
            gameDto.score,
            gameDto.level,
            gameDto.createdAt,
            gameDto.updatedAt
        );

        const errors = await validate(gameEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        return await this.gameRepository.create(gameEntity);
    }
}
