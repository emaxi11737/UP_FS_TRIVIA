import mongoose from 'mongoose';

const questionMongoDBSchema = new mongoose.Schema(
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

const questionMongoDBModel = mongoose.model('question', questionMongoDBSchema);

export default questionMongoDBModel;
