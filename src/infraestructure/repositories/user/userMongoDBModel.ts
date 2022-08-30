import mongoose from 'mongoose';

const userMongoDBSchema = new mongoose.Schema(
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

const userMongoDBModel = mongoose.model('user', userMongoDBSchema);

export default userMongoDBModel;
