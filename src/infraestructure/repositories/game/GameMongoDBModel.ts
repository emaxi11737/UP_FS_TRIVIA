import { model, Schema } from 'mongoose';

const GameMongoDBSchema = new Schema(
    {
        userId: String,
        score: Number,
        level: Number,
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const GameMongoDBModel = model('game', GameMongoDBSchema);

export default GameMongoDBModel;
