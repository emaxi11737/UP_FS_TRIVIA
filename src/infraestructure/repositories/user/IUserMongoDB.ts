export default interface IUserMongoDB {
    username?: string;
    password?: string;
    email?: string;
    roles: Array<string>;
    deletedAt?: Date;
}
