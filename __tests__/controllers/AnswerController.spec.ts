import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import chai from "chai";
import "mocha";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import AnswerService from "../../src/configuration/usecases/AnswerService";
import AnswerController from "../../src/entrypoint/controllers/AnswerController";
import FakeAnswerRepository from "../helpers/FakeAnswerRepository";
import FakeQuestionRepository from "../helpers/FakeQuestionRepository";
import { mockRequest, mockResponse } from "../helpers/helpers";
import ResponseObject from "../../src/helpers/ResponseObject";

const { expect } = chai;

chai.use(sinonChai);

describe("AnswerController", () => {
    let answerController: AnswerController;
    let sandbox: SinonSandbox;
    let answerService: AnswerService;
    let fakeAnswerRepository: FakeAnswerRepository;
    let fakeQuestionRepository: FakeQuestionRepository;
    let answer = {
        id: "5ed8240576820810650d8fg3",
        description: "Esta es la respuesta 4",
        questionId: "633a07b4f30be8780cd00c33",
        isRight: true,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    };
    const response: any = mockResponse();

    beforeEach(() => {
        fakeAnswerRepository = new FakeAnswerRepository();
        fakeQuestionRepository = new FakeQuestionRepository();
        answerService = new AnswerService(fakeAnswerRepository, fakeQuestionRepository);
        answerController = new AnswerController(answerService);

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

            await answerController.create(emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });

        it("Should return 201 and a answer", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(answer);

            await answerController.create(request, response);

            expect(response.status).to.have.been.calledWith(201);
        });


    });

    describe("update", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await answerController.update("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });

    });

    describe("read", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await answerController.read("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });

    describe("list", () => {
        it("Should return 400 on wrong request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const wrongReq: any = { query: { questionId: "a" } };

            await answerController.list(wrongReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });

    describe("delete", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await answerController.delete("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });

});
