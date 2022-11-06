import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import chai from "chai";
import "mocha";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import GameService from "../../src/configuration/usecases/GameService";
import GameController from "../../src/entrypoint/controllers/GameController";
import FakeGameRepository from "../helpers/FakeGameRepository";
import FakeUserRepository from "../helpers/FakeUserRepository";
import { mockRequest, mockResponse } from "../helpers/helpers";
import ResponseObject from "../../src/helpers/ResponseObject";

const { expect } = chai;

chai.use(sinonChai);

describe("GameController", () => {
    let gameController: GameController;
    let sandbox: SinonSandbox;
    let gameService: GameService;
    let fakeGameRepository: FakeGameRepository;
    let fakeUserRepository: FakeUserRepository;
    let game = {
        id: "5ed8240576820810650d8g32",
        userId: "5ed8240576820810650d8f61",
        score: 100,
        level: 1,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    }

    const response: any = mockResponse();

    beforeEach(() => {
        fakeGameRepository = new FakeGameRepository();
        fakeUserRepository = new FakeUserRepository();
        gameService = new GameService(fakeGameRepository, fakeUserRepository);
        gameController = new GameController(gameService);

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

            await gameController.create(emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });

        it("Should return 201 and a answer", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(game);

            await gameController.create(request, response);

            expect(response.status).to.have.been.calledWith(201);
            
        });
    });

    describe("update", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await gameController.update("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });

    describe("read", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await gameController.read("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });
});
