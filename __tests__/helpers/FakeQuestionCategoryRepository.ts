import IQuestionCategoryRepository from "../../src/application/repositories/IQuestionCategoryRepository";
import QuestionCategory from "../../src/domain/questioncategory/QuestionCategory";
import PaginationFilter from '../../src/domain/pagination/PaginationFilter';


export default class FakeQuestionCategoryRepository implements IQuestionCategoryRepository {

    public questionCategories = [{
        id: "5ed8240576820810650d8f61",
        name: "Categoria 1",
        description: "Esta es la categoria 1",
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
        deletedAt: new Date("2022-09-30T14:29:04.959Z")
    },
    {
        id: "5ed8240576820810650d8f62",
        name: "Categoria 2",
        description: "Esta es la categoria 2",
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
        deletedAt: new Date("2022-09-30T14:29:04.959Z")
    },
    {
        id: "5ed8240576820810650d8f63",
        name: "Categoria 3",
        description: "Esta es la categoria 3",
        createdAt: new Date("2022-08-30T14:29:04.959Z"),
        updatedAt: new Date("2022-08-30T14:29:04.959Z"),
        deletedAt: new Date("2022-09-30T14:29:04.959Z")
    }];

    public async create(questionCategory: QuestionCategory): Promise<QuestionCategory> {
        const questionCategoryExist = this.questionCategories.find((questionCategoryList) => questionCategoryList.description === questionCategory.description
            && questionCategoryList.name === questionCategory.name);

        if (questionCategoryExist) throw Error("Question category exist");

        return questionCategory;
    }
    public async read(questionCategoryId: string): Promise<QuestionCategory> {
        const questionCategoryObject = this.questionCategories.find((questionCategoryList) => questionCategoryList.id === questionCategoryId);

        if (!questionCategoryObject) throw Error("Question Category not found");

        return questionCategoryObject;
    }
    public async update(questionCategory: QuestionCategory): Promise<QuestionCategory> {
        const questionCategoryObject = this.questionCategories.find((questionCategoryList) => questionCategoryList.id === questionCategory.id);

        if (!questionCategoryObject) throw Error("Question Category not found");

        return questionCategory;
    }
    public async list(pagination: PaginationFilter, filters?: any): Promise<QuestionCategory[]> {
        const questionCategoriesResults = this.questionCategories.filter(questionCategory => questionCategory.deletedAt != null)

        return questionCategoriesResults;
    }

}
