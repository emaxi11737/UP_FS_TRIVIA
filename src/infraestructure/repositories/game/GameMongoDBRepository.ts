import { Model } from 'mongoose';
import { injectable } from 'inversify';
import IGameMongoDB from '@infraestructure/repositories/game/IGameMongoDB';
import GameMongoDBModel from '@infraestructure/repositories/game/GameMongoDBModel';
import GameMongoDBMapper from '@infraestructure/repositories/game/GameMongoDBMapper';
import IGameRepository from '@application/repositories/IGameRepository';
import Game from '@domain/game/Game';

@injectable()
export default class GameMongoDBRepository implements IGameRepository {

    private model: Model<IGameMongoDB>;

    constructor() {
        this.model = GameMongoDBModel;
    }

    public async create(game: Game): Promise<Game> {
        const newGameObject = new this.model(game);
        const gameObject: any = await newGameObject.save();

        return GameMongoDBMapper.toEntity(gameObject);
    }

    public async read(gameId: string): Promise<Game> {
        const gameObject: any = await this.model.findById({ _id: gameId });

        if (!gameObject) throw Error("Game not found");

        return GameMongoDBMapper.toEntity(gameObject);
    }

    public async update(game: Game): Promise<Game> {
        const gameObject: any = await this.model.findByIdAndUpdate(game.id, game, { new: true });

        if (!gameObject) throw Error("Game not found");

        return GameMongoDBMapper.toEntity(gameObject);
    }
}
