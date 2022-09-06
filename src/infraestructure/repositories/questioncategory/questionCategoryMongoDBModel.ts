import mongoose from 'mongoose';

const questionCategoryMongoDBSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const questionCategoryMongoDBModel = mongoose.model('questioncategory', questionCategoryMongoDBSchema);

export default questionCategoryMongoDBModel;
