import mongoose from 'mongoose';

const QuestionMongoDBSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        questionCategoryId: String
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const QuestionMongoDBModel = mongoose.model('question', QuestionMongoDBSchema);

export default QuestionMongoDBModel;
