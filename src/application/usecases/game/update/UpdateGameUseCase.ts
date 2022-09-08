import { validate } from 'class-validator';
import IUpdateGameUseCase from '@application/usecases/game/update/IUpdateGameUseCase';
import IGameRepository from '@application/repositories/IGameRepository';
import IGamePatchDto from '@application/usecases/game/IGamePatchDto';
import IGameDto from '@application/usecases/game/IGameDto';
import GamePatch from '@domain/game/GamePatch';

export default class UpdateGameUseCase implements IUpdateGameUseCase {

    private gameRepository: IGameRepository;

    constructor(gameRepository: IGameRepository) {
        this.gameRepository = gameRepository;
    }

    public async updatePartial(gameDto: IGamePatchDto): Promise<IGameDto> {
        const gamePatchEntity = new GamePatch(
            gameDto.id,
            gameDto.score,
            gameDto.level
        );

        const errors = await validate(gamePatchEntity);
        if (errors.length > 0) throw Error("Please, check input params");
        const game = await this.gameRepository.read(gameDto.id);

        if (gamePatchEntity.score) game.score = gamePatchEntity.score;
        if (gamePatchEntity.level) game.level = gamePatchEntity.level;

        return await this.gameRepository.update(game);
    }
}
