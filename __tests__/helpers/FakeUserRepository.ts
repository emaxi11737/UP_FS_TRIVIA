import IUserRepository from "../../src/application/repositories/IUserRepository";
import User from "../../src/domain/user/User";
import UserPatch from "../../src/domain/user/UserPatch";
import md5 from "md5";

export default class FakeUserRepository implements IUserRepository {

    public updatedUser = {
        id: "5ed8240576820810650d8f61",
        username: "test.test",
        email: "test@test.com",
        password: md5("1234"),
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    };

    public users = [{
        id: "5ed8240576820810650d8f61",
        username: "test.test",
        email: "test@test.com",
        password: md5("1234"),
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    },
    {
        id: "5ed8240576820810650d8f62",
        username: "damian.sciutto",
        email: "damian.sciutto@gmail.com",
        password: md5("123456"),
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z")
    },
    {
        id: "5ed8240576820810650d8f63",
        username: "pepe.argento",
        email: "pargentino@gmail.com",
        password: md5("12346"),
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
        deletedAt: new Date("2022-09-30T14:29:04.959Z")
    }];

    public async create(user: User): Promise<User> {
        user.createdAt = new Date("2022-08-30T14:29:04.959Z");
        user.updatedAt = new Date("2022-08-30T14:29:04.959Z");

        return user;
    }

    public async read(userId: string): Promise<User> {
        const userObject = this.users.find((userList) => userList.id === userId);

        if (!userObject) throw Error("User not found");

        return userObject;
    }

    public async updatePartial(user: UserPatch): Promise<User> {
        const userObject = this.users.find((userList) => userList.id === user.id);

        if (!userObject) throw Error("User not found");

        return userObject;
    }

    public async readByEmail(email: string): Promise<User | undefined> {
        const userObject = this.users.find((userList) => userList.email === email);

        if (!userObject) return;

        return userObject;
    }
    public async update(user: User): Promise<User> {
        const userObject = this.users.find((userList) => userList.id === user.id);

        if (!userObject) throw Error("User not found");

        return user;
    }
}
