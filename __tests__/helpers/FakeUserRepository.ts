import IUserRepository from "../../src/application/repositories/IUserRepository";
import User from "../../src/domain/user/User";
import UserPatch from "../../src/domain/user/UserPatch";
import md5 from "md5";

export default class FakeUserRepository implements IUserRepository {

    public users = [{
        id: "5ed8240576820810650d8f61",
        username: "test.test",
        password: md5("1234"),
        createdAt: "2022-08-30T14:29:04.959Z",
        updatedAt: "2022-08-30T14:29:04.959Z"
    },
    {
        id: "5ed8240576820810650d8f62",
        username: "damian.sciutto",
        password: md5("12345"),
        createdAt: "2022-08-30T14:29:04.959Z",
        updatedAt: "2022-08-30T14:29:04.959Z"
    },
    {
        id: "5ed8240576820810650d8f63",
        username: "pepe.argento",
        password: md5("12346"),
        createdAt: "2022-08-30T14:29:04.959Z",
        updatedAt: "2022-08-30T14:29:04.959Z"
    }];

    public async create(user: User): Promise<User> {
        const userExist = this.users.find((userList) => userList.username === user.username);

        if (userExist) throw Error("User exist");

        user.createdAt = "2022-08-30T14:29:04.959Z";
        user.updatedAt = "2022-08-30T14:29:04.959Z";

        return user;
    }

    public async read(user: User): Promise<User> {
        const userObject = this.users.find((userList) => userList.username === user.username);

        if (!userObject) throw Error("User not found");

        if (userObject.password !== user.password) throw Error("Invalid username or password");

        return user;
    }

    public async updatePartial(user: UserPatch): Promise<User> {
        const userObject = this.users.find((userList) => userList.id === user.id);

        if (!userObject) throw Error("User not found");

        return userObject;
    }
}
