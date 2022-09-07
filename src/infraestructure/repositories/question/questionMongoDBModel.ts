import mongoose from 'mongoose';

const questionMongoDBSchema = new mongoose.Schema(
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

const questionMongoDBModel = mongoose.model('question', questionMongoDBSchema);

export default questionMongoDBModel;
