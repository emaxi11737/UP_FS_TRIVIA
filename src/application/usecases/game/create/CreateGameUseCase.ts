import { validate } from "class-validator";
import ICreateGameUseCase from '@application/usecases/game/create/ICreateGameUseCase';
import IGameRepository from '@application/repositories/IGameRepository';
import IGameDto from "@application/usecases/game/IGameDto";
import Game from "@domain/game/Game";
import IUserRepository from "@application/repositories/IUserRepository";

export default class CreateGameUseCase implements ICreateGameUseCase {

    private gameRepository: IGameRepository;
    private userRepository: IUserRepository;

    constructor(
        gameRepository: IGameRepository,
        userRepository: IUserRepository
    ) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
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

        const userExist = await this.userRepository.read(gameEntity.userId);
        if (!userExist) throw Error("User not found");

        return await this.gameRepository.create(gameEntity);
    }
}
