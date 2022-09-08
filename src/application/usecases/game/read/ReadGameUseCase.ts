import { validate } from 'class-validator';
import IReadGameUseCase from '@application/usecases/game/read/IReadGameUseCase';
import IGameDto from '@application/usecases/game/IGameDto';
import IGameRepository from '@application/repositories/IGameRepository';
import GameRead from '@domain/game/GameRead';

export default class ReadGameUseCase implements IReadGameUseCase {

    private gameRepository: IGameRepository;

    constructor(gameRepository: IGameRepository) {
        this.gameRepository = gameRepository;
    }

    public async read(gameId: string): Promise<IGameDto> {
        const gameReadEntity = new GameRead(
            gameId,
        );

        const errors = await validate(gameReadEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        return await this.gameRepository.read(gameReadEntity.id);
    }
}
