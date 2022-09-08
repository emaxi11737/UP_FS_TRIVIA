import { Model } from 'mongoose';
import { injectable } from 'inversify';
import IUserRepository from '@application/repositories/IUserRepository';
import User from '@domain/user/User';
import UserMongoDBMapper from '@infraestructure/repositories/user/UserMongoDBMapper';
import UserMongoDBModel from '@infraestructure/repositories/user/UserMongoDBModel';
import IUserMongoDB from '@infraestructure/repositories/user/IUserMongoDB';

@injectable()
export default class UserMongoDBRepository implements IUserRepository {

    private model: Model<IUserMongoDB>;

    constructor() {
        this.model = UserMongoDBModel;
    }

    public async create(user: User): Promise<User> {
        const newUserObject = new this.model(user);
        const userObject: any = await newUserObject.save();

        return UserMongoDBMapper.toEntity(userObject);
    }

    public async read(userId: string): Promise<User> {
        const userObject: any = await this.model.findById({ _id: userId });

        if (!userObject) throw Error("User not found");

        return UserMongoDBMapper.toEntity(userObject);
    }

    public async readByEmail(email: string): Promise<User> {
        const userObject: any = await this.model.findOne({ email });

        if (!userObject) throw Error("User not found");

        return UserMongoDBMapper.toEntity(userObject);
    }

    public async update(user: User): Promise<User> {
        const userObject: any = await this.model.findByIdAndUpdate(user.id, user, { new: true });

        if (!userObject) throw Error("User not found");

        return UserMongoDBMapper.toEntity(userObject);
    }
}
