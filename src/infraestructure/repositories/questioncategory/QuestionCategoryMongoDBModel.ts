import mongoose from 'mongoose';

const QuestionCategoryMongoDBSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        deletedAt: Date
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const QuestionCategoryMongoDBModel = mongoose.model('questionCategories', QuestionCategoryMongoDBSchema);

export default QuestionCategoryMongoDBModel;
