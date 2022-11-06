import IAnswerRepository from "../../src/application/repositories/IAnswerRepository";
import Answer from "../../src/domain/answer/Answer";
import PaginationFilter from '../../src/domain/pagination/PaginationFilter';

export default class FakeAnswerRepository implements IAnswerRepository {
    public answers = [{
        id: "5ed8240576820810650d8g32",
        description: "Esta es la respuesta 1",
        questionId: "633a07b4f30be8780cd00c33",
        level: 1,
        isRight: true,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
    },
    {
        id: "5ed8240576820810650d8fg33",
        description: "Esta es la respuesta 2",
        questionId: "633a07b4f30be8780cd00c33",
        level: 1,
        isRight: false,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z")
    },
    {
        id: "5ed8240576820810650d8fg34",
        description: "Esta es la respuesta 3",
        questionId: "633a07b4f30be8780cd00c33",
        level: 1,
        isRight: false,
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
        deletedAt: new Date("2022-09-30T14:29:04.959Z"),
    }];
    public async create(answer: Answer): Promise<Answer> {
        return answer;
    }
    public async update(answer: Answer): Promise<Answer> {
        const answerObject = this.answers.find((answerList) => answerList.id === answer.id);

        if (!answerObject) throw Error("Answer not found");

        return answer;
    }
    public async read(answerId: string): Promise<Answer> {
        const answerObject = this.answers.find((answerList) => answerList.id === answerId);

        if (!answerObject) throw Error("Answer not found");

        return answerObject;
    }
    public async list(pagination: PaginationFilter, filters?: any): Promise<Answer[]> {
        const answersResults = this.answers.filter(answer => answer.deletedAt != null)

        return answersResults;
    }
    public async findAll(filters?: any): Promise<Answer[]> {
        const answersResults = this.answers.filter(answer => answer.deletedAt != null)

        return answersResults;
    }





}
