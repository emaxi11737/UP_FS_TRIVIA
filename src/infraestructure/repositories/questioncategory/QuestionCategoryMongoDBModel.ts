import mongoose from 'mongoose';

const QuestionCategoryMongoDBSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const QuestionCategoryMongoDBModel = mongoose.model('questioncategory', QuestionCategoryMongoDBSchema);

export default QuestionCategoryMongoDBModel;
