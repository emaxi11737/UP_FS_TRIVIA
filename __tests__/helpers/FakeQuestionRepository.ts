import IQuestionRepository from "../../src/application/repositories/IQuestionRepository";
import Question from "../../src/domain/question/Question";
import PaginationFilter from '../../src/domain/pagination/PaginationFilter';

export default class FakeQuestionRepository implements IQuestionRepository {
    public questions = [{
        id: "633a07b4f30be8780cd00c33",
        name: "Pregunta 1",
        description: "Esta es la pregunta 1",
        questionCategoryId: "5ed8240576820810650d8f61",
        level: 1,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    },
    {
        id: "633a07b4f30be8780cd00c34",
        name: "Pregunta 2",
        description: "Esta es la pregunta 2",
        questionCategoryId: "5ed8240576820810650d8f61",
        level: 2,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z")
    },
    {
        id: "633a07b4f30be8780cd00c35",
        name: "Pregunta 3",
        description: "Esta es la pregunta 3",
        questionCategoryId: "5ed8240576820810650d8f62",
        level: 3,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
        deletedAt: new Date("2022-09-30T14:29:04.959Z")
    }];

    public async create(question: Question): Promise<Question> {
        const questionExist = this.questions.find((questionList) => questionList.description === question.description
            && questionList.name === question.name);

        if (questionExist) throw Error("Question exist");

        return question;
    }
    public async read(questionId: string): Promise<Question> {
        const questionObject = this.questions.find((questionList) => questionList.id === questionId);

        if (!questionObject) throw Error("Question not found");

        return questionObject;
    }
    public async update(question: Question): Promise<Question> {
        const userObject = this.questions.find((questionList) => questionList.id === question.id);

        if (!userObject) throw Error("Question not found");

        return question;
    }
    public async list(pagination: PaginationFilter, filters?: any): Promise<Question[]> {
        const questionsResults = this.questions.filter(question => question.deletedAt != null)

        return questionsResults;
    }
    public async random(filters?: any): Promise<Question[]> {
        const questionsResults = this.questions.filter(question => question.deletedAt != null)

        return questionsResults;
    }
    public async findAll(filters?: any): Promise<Question[]> {
        const questionsResults = this.questions.filter(question => question.deletedAt != null)

        return questionsResults;
    }





}
