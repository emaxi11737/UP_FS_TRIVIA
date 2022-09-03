import { model, Schema } from 'mongoose';

const UserMongoDBSchema = new Schema(
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

const UserMongoDBModel = model('user', UserMongoDBSchema);

export default UserMongoDBModel;