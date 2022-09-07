import { Model, Document } from 'mongoose';
import { injectable } from 'inversify';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import QuestionCategory from '@domain/questioncategory/QuestionCategory';
import QuestionCategoryPartial from '@domain/questioncategory/QuestionCategoryPatch';
import QuestionCategoryMongoDBMapper from '@infraestructure/repositories/questioncategory/QuestionCategoryMongoDBMapper';
import questionCategoryMongoDBModel from '@infraestructure/repositories/questioncategory/QuestionCategoryMongoDBModel';
import IQuestionCategoryMongoDB from './IQuestionCategoryMongoDB';

@injectable()
export default class QuestionCategoryMongoDBRepository implements IQuestionCategoryRepository {

    private model: Model<IQuestionCategoryMongoDB>;

    constructor() {
        this.model = questionCategoryMongoDBModel;
    }
    
    public async create(questionCategory: QuestionCategory): Promise<QuestionCategory> {
        const questionCategoryExist: any = await this.model.findOne({name: questionCategory.name});

        if (questionCategoryExist) throw Error("QuestionCategory exist");

        const newQuestionCategoryObject = new this.model(questionCategory);
        const questionCategoryObject: any = await newQuestionCategoryObject.save();
        
        return QuestionCategoryMongoDBMapper.toEntity(questionCategoryObject);
    }
    
    public async read(questionCategory: QuestionCategory): Promise<QuestionCategory> {
        const questionCategoryObject: any = await this.model.findOne({name: questionCategory.name});

        if (! questionCategoryObject) throw Error("QuestionCategory not found");

        return QuestionCategoryMongoDBMapper.toEntity(questionCategoryObject);
    }
    
    public async updatePartial(questionCategory: QuestionCategoryPartial): Promise<QuestionCategory> {
        const questionCategoryObject: any = await this.model.findByIdAndUpdate(questionCategory.id, questionCategory, { new: true });

        if (! questionCategoryObject) throw Error("QuestionCategory not found");

        return QuestionCategoryMongoDBMapper.toEntity(questionCategoryObject);
    }
}
