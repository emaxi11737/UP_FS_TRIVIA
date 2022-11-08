import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import chai, { use } from "chai";
import "mocha";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import UserService from "../../src/configuration/usecases/UserService";
import UserController from "../../src/entrypoint/controllers/UserController";
import FakeUserRepository from "../helpers/FakeUserRepository";
import { mockRequest, mockResponse } from "../helpers/helpers";
import ResponseObject from "../../src/helpers/ResponseObject";
import md5 from "md5";

const { expect } = chai;

chai.use(sinonChai);

describe("UserController", () => {
    let userController: UserController;
    let sandbox: SinonSandbox;
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;
    let user = {
        id: "5ed8240576820810650d8f61",
        username: "test.test",
        email: "test@test.com",
        password: md5("1234"),
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    };
    let updatedUser = {
        id: "5ed8240576820810650d8f62",
        username: "test.test.modified",
        email: "test@test.com",
        password: md5("1234"),
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    };

    const response: any = mockResponse();

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
        userController = new UserController(userService);

        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("create", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await userController.create(emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });
        it("Should return 400 on an existing user", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(user);

            await userController.create(request, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("User exist")));
        });

        it("Should return 201 and a user", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            user.username = "nuevoUser";
            user.email = "nuevoUser@test.com";

            const request: any = mockRequest(user);

            await userController.create(request, response);

            expect(response.status).to.have.been.calledWith(201);
        });

    });

    describe("read", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(updatedUser);

            await userController.read("", request, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });

    describe("update", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(updatedUser);

            await userController.update("", request, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });
        
        it("Should return 200 and an unpdated user", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await userController.update("5ed8240576820810650d8f62", emptyReq, response);

            expect(response.status).to.have.been.calledWith(200);
        });
    });

    describe("delete", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await userController.delete("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });

        it("Should return 204 as deleted user", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await userController.delete("5ed8240576820810650d8f61", emptyReq, response);

            expect(response.status).to.have.been.calledWith(204);
        });

    });
});
