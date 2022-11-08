import "reflect-metadata";
// tslint:disable-next-line:ordered-imports
import chai from "chai";
import "mocha";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import QuestionCategoryService from "../../src/configuration/usecases/QuestionCategoryService";
import QuestionCategoryController from "../../src/entrypoint/controllers/QuestionCategoryController";
import FakeQuestionCategoryRepository from "../helpers/FakeQuestionCategoryRepository";
import FakeQuestionRepository from "../helpers/FakeQuestionRepository";
import FakeAnswerRepository from "../helpers/FakeAnswerRepository";
import { mockRequest, mockResponse } from "../helpers/helpers";
import ResponseObject from "../../src/helpers/ResponseObject";

const { expect } = chai;

chai.use(sinonChai);

describe("QuestionCategoryController", () => {
    let questionCategoryController: QuestionCategoryController;
    let sandbox: SinonSandbox;
    let questionCategoryService: QuestionCategoryService;
    let fakeQuestionCategoryRepository: FakeQuestionCategoryRepository;
    let fakeQuestionRepository: FakeQuestionRepository;
    let fakeAnswerRepository: FakeAnswerRepository;
    let questionCategory = {
        id: "5ed8240576820810650d8f64",
        name: "Categoria 4",
        description: "Esta es la categoria 4",
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z")
    }

    const response: any = mockResponse();

    beforeEach(() => {
        fakeQuestionCategoryRepository = new FakeQuestionCategoryRepository();
        fakeQuestionRepository = new FakeQuestionRepository();
        fakeAnswerRepository = new FakeAnswerRepository();
        questionCategoryService = new QuestionCategoryService(fakeQuestionCategoryRepository, fakeQuestionRepository, fakeAnswerRepository);
        questionCategoryController = new QuestionCategoryController(questionCategoryService);

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

            await questionCategoryController.create(emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


        it("Should return 201 and a question category", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const request: any = mockRequest(questionCategory);

            await questionCategoryController.create(request, response);

            expect(response.status).to.have.been.calledWith(201);

        });

        it("Should return 400 on existing descripcion and name", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            questionCategory.name = "Categoria 1";
            questionCategory.description = "Esta es la categoria 1";

            const request: any = mockRequest(questionCategory);

            await questionCategoryController.create(request, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Question category exist")));


        });



    });


    describe("update", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await questionCategoryController.update("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });


    });

    describe("list", () => {
    });


    describe("delete", () => {
        it("Should return 400 on empty request", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await questionCategoryController.delete("", emptyReq, response);

            expect(response.status).to.have.been.calledWith(400);
            expect(response.json).to.have.been.calledWithMatch(ResponseObject.makeErrorResponse("400", new Error("Please, check input params")));
        });
        it("Should return 204 and a deleted answer", async () => {
            sandbox.spy(response, "status");
            sandbox.spy(response, "json");

            const emptyReq: any = { body: {} };

            await questionCategoryController.delete("5ed8240576820810650d8f61", emptyReq, response);
            
            expect(response.status).to.have.been.calledWith(204);
        });

    });
});
