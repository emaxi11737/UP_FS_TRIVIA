import { Model } from 'mongoose';
import { injectable } from 'inversify';
import IUserRepository from '@application/repositories/IUserRepository';
import User from '@domain/user/User';
import UserPartial from '@domain/user/UserPatch';
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
        const userExist: any = await this.model.findOne({ email: user.email });

        if (userExist) throw Error("User exist");

        const newUserObject = new this.model(user);
        const userObject: any = await newUserObject.save();

        return UserMongoDBMapper.toEntity(userObject);
    }

    public async read(user: User): Promise<User> {
        const userObject: any = await this.model.findOne({ email: user.email });

        if (!userObject) throw Error("User not found");

        if (userObject.password !== user.password) throw Error("Invalid email or password");

        return UserMongoDBMapper.toEntity(userObject);
    }

    public async updatePartial(user: UserPartial): Promise<User> {
        const userObject: any = await this.model.findByIdAndUpdate(user.id, user, { new: true });

        if (!userObject) throw Error("User not found");

        return UserMongoDBMapper.toEntity(userObject);
    }
}
