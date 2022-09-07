import mongoose from 'mongoose';

const questionCategoryMongoDBSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const questionCategoryMongoDBModel = mongoose.model('questioncategory', questionCategoryMongoDBSchema);

export default questionCategoryMongoDBModel;
