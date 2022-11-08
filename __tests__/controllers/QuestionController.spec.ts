import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import chai from "chai";
import "mocha";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import QuestionService from "../../src/configuration/usecases/QuestionService";
import QuestionController from "../../src/entrypoint/controllers/QuestionController";
import FakeQuestionRepository from "../helpers/FakeQuestionRepository";
import FakeQuestionCategoryRepository from "../helpers/FakeQuestionCategoryRepository";
import FakeAnswerRepository from "../helpers/FakeAnswerRepository";
import { mockRequest, mockResponse } from "../helpers/helpers";
import ResponseObject from "../../src/helpers/ResponseObject";

const { expect } = chai;

chai.use(sinonChai);

describe("QuestionController", () => {
    let questionController: QuestionController;
    let sandbox: SinonSandbox;
    let answerService: QuestionService;
    let fakeQuestionRepository: FakeQuestionRepository;
    let fakeQuestionCategoryRepository: FakeQuestionCategoryRepository;
    let fakeAnswerRepository: FakeAnswerRepository;
    let question = {
        id: "633a07b4f30be8780cd00c33",
        name: "Pregunta 1",
        description: "Esta es la pregunta 1",
        questionCategoryId: "5ed8240576820810650d8f61",
        level: 1,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z")
    };

    const response: any = mockResponse();

    beforeEach(() => {
        fakeQuestionRepository = new FakeQuestionRepository();
        fakeQuestionCategoryRepository = new FakeQuestionCategoryRepository();
        fakeAnswerRepository = new FakeAnswerRepository();
        answerService = new QuestionService(fakeQuestionRepository, fakeQuestionCategoryRepository, fakeAnswerRepository);
        questionController = new QuestionController(answerService);

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

            await questionController.create(emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });

        it("Should return 400 on an existing question", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(question);

            await questionController.create(request, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Question exist")));
        });

        it("Should return 201 and a question", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            question.description = "Esta es la pregunta 4";
            question.name = "Pregunta 4";

            const request: any = mockRequest(question);

            await questionController.create(request, response);

            expect(response.status).to.have.been.calledWith(201);
        });
    });

    describe("random", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await questionController.random(emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Question categories not found")));
        });


    });

    describe("update", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await questionController.update("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });

    describe("delete", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await questionController.delete("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });
        it("Should return 204 and a deleted answer", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await questionController.delete("633a07b4f30be8780cd00c33", emptyReq, response);
            
            expect(response.status).to.have.been.calledWith(204);

        });
    });
});
