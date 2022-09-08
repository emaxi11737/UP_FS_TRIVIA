import { model, Schema } from 'mongoose';

const AnswerMongoDBSchema = new Schema(
    {
        questionId: String,
        description: String,
        isRight: Boolean,
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const AnswerMongoDBModel = model('answers', AnswerMongoDBSchema);

export default AnswerMongoDBModel;
