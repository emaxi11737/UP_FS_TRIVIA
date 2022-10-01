import { Model } from 'mongoose';
import { injectable } from 'inversify';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import QuestionCategory from '@domain/questioncategory/QuestionCategory';
import QuestionCategoryMongoDBMapper from '@infraestructure/repositories/questioncategory/QuestionCategoryMongoDBMapper';
import QuestionCategoryMongoDBModel from '@infraestructure/repositories/questioncategory/QuestionCategoryMongoDBModel';
import IQuestionCategoryMongoDB from '@infraestructure/repositories/questioncategory/IQuestionCategoryMongoDB';
import Filter from '@domain/filter/Filter';
import PaginationFilter from '@domain/pagination/PaginationFilter';

@injectable()
export default class QuestionCategoryMongoDBRepository implements IQuestionCategoryRepository {

    private model: Model<IQuestionCategoryMongoDB>;

    constructor() {
        this.model = QuestionCategoryMongoDBModel;
    }

    public async create(questionCategory: QuestionCategory): Promise<QuestionCategory> {
        const questionCategoryExist: any = await this.model.findOne({ name: questionCategory.name, description: questionCategory.description });
        if (questionCategoryExist && !questionCategoryExist.deletedAt) return questionCategoryExist;

        const newQuestionCategoryObject = new this.model(questionCategory);
        const questionCategoryObject: any = await newQuestionCategoryObject.save();

        return QuestionCategoryMongoDBMapper.toEntity(questionCategoryObject);
    }

    public async read(id: string): Promise<QuestionCategory> {
        const questionCategoryObject: any = await this.model.findOne({ _id: id });

        if (!questionCategoryObject) throw Error("Question category not found");

        return QuestionCategoryMongoDBMapper.toEntity(questionCategoryObject);
    }

    public async update(questionCategory: QuestionCategory): Promise<QuestionCategory> {
        const questionCategoryObject: any = await this.model.findByIdAndUpdate(questionCategory.id, questionCategory, { new: true });

        if (!questionCategoryObject) throw Error("Question category not found");

        return QuestionCategoryMongoDBMapper.toEntity(questionCategoryObject);
    }

    public async list(pagination: PaginationFilter, filters?: Filter): Promise<QuestionCategory[]> {
        const questionCategoriesResults = await this.model.find({ deletedAt: null })
            .sort({ createdAt: 'asc' })
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit);

        return questionCategoriesResults.map((questionCategoryModel: any) => QuestionCategoryMongoDBMapper.toEntity(questionCategoryModel));
    }
}
