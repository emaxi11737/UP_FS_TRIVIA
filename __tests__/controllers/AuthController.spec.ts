import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import chai from "chai";
import "mocha";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import AuthService from "../../src/configuration/usecases/AuthService";
import AuthController from "../../src/entrypoint/controllers/AuthController";
import FakeUserRepository from "../helpers/FakeUserRepository";
import { mockRequest, mockResponse } from "../helpers/helpers";
import ResponseObject from "../../src/helpers/ResponseObject";

const { expect } = chai;

chai.use(sinonChai);

describe("AuthController", () => {
    let authController: AuthController;
    let sandbox: SinonSandbox;
    let authService: AuthService;
    let fakeUserRepository: FakeUserRepository;

    let user = {
        id: "5ed8240576820810650d8f62",
        username: "damian.sciutto",
        email: "damian.sciutto@gmail.com",
        password: "123456",
        createdAt: "2022-08-30T14:29:04.959Z",
        updatedAt: "2022-08-30T14:29:04.959Z"
    };

    const response: any = mockResponse();

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        authService = new AuthService(fakeUserRepository);
        authController = new AuthController(authService);

        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("sign", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await authController.signin(emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });

        it("Should return 200 and a user", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(user);

            await authController.signin(request, response);

            expect(response.status).to.have.been.calledWith(200);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeSuccessResponse(user));
        });

        it("Should return 400 on user not found", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            user.username = "dami";

            const request: any = mockRequest(user);

            await authController.signin(request, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("User not found")));
        });

        it("Should return 400 on user with invalid username or password", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            user.username = "damian.sciutto";
            user.password = "pepe";

            const request: any = mockRequest(user);

            await authController.signin(request, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Invalid username or password")));
        });
    });
});
