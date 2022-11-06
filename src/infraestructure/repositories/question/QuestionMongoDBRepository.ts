import { Model } from 'mongoose';
import { injectable } from 'inversify';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import Question from '@domain/question/Question';
import QuestionPartial from '@domain/question/QuestionPatch';
import QuestionMongoDBMapper from '@infraestructure/repositories/question/QuestionMongoDBMapper';
import QuestionMongoDBModel from '@infraestructure/repositories/question/QuestionMongoDBModel';
import IQuestionMongoDB from '@infraestructure/repositories/question/IQuestionMongoDB';
import QuestionFilter from '@domain/question/QuestionFilter';
import RandomQuestionFilter from '@domain/question/RandomQuestionFilter';
import PaginationFilter from '@domain/pagination/PaginationFilter';

@injectable()
export default class QuestionMongoDBRepository implements IQuestionRepository {

    private model: Model<IQuestionMongoDB>;

    constructor() {
        this.model = QuestionMongoDBModel;
    }

    public async create(question: Question): Promise<Question> {
        const questionExist: any = await this.model.findOne({ name: question.name, description: question.description });

        if (questionExist && !questionExist.deletedAt) return questionExist;

        const newQuestionObject = new this.model(question);
        const questionObject: any = await newQuestionObject.save();

        return QuestionMongoDBMapper.toEntity(questionObject);
    }

    public async read(id: string): Promise<Question> {
        const questionObject: any = await this.model.findOne({ _id: id });

        if (!questionObject) throw Error("Question not found");

        return QuestionMongoDBMapper.toEntity(questionObject);
    }

    public async update(question: QuestionPartial): Promise<Question> {
        const questionObject: any = await this.model.findByIdAndUpdate(question.id, question, { new: true });

        if (!questionObject) throw Error("Question not found");

        return QuestionMongoDBMapper.toEntity(questionObject);
    }

    public async list(pagination: PaginationFilter, filters?: QuestionFilter): Promise<Question[]> {
        const questionResults = await this.model.find({ filters, deletedAt: null })
            .sort({ createdAt: 'asc' })
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit);
        return questionResults.map((questionModel: any) => QuestionMongoDBMapper.toEntity(questionModel));
    }

    public async findAll(filters?: QuestionFilter): Promise<Question[]> {
        const questionResults = await this.model.find(filters);
        return questionResults.map((questionModel: any) => QuestionMongoDBMapper.toEntity(questionModel));
    }

    public async random(filters?: RandomQuestionFilter): Promise<Question[]> {
        const questionResults = await this.model.aggregate([
            {
                $match: {
                    "questionCategoryId": {
                        $in: filters.questionCategoriesId
                    },
                    "level": {
                        $eq: filters.level
                    }
                }
            },
            {
                $sample: {
                    size: filters.size
                }
            }
        ]);
        return questionResults.map((questionModel: any) => {
            questionModel.id = questionModel._id;

            return QuestionMongoDBMapper.toEntity(questionModel);
        });
    }
}
