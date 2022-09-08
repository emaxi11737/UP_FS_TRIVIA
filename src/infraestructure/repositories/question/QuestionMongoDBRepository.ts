import { Model } from 'mongoose';
import { injectable } from 'inversify';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import Question from '@domain/question/Question';
import QuestionPartial from '@domain/question/QuestionPatch';
import QuestionMongoDBMapper from '@infraestructure/repositories/question/QuestionMongoDBMapper';
import QuestionMongoDBModel from '@infraestructure/repositories/question/QuestionMongoDBModel';
import IQuestionMongoDB from '@infraestructure/repositories/question/IQuestionMongoDB';

@injectable()
export default class QuestionMongoDBRepository implements IQuestionRepository {

    private model: Model<IQuestionMongoDB>;

    constructor() {
        this.model = QuestionMongoDBModel;
    }

    public async create(question: Question): Promise<Question> {
        const questionExist: any = await this.model.findOne({ name: question.name });

        if (questionExist) throw Error("Question exist");

        const newQuestionObject = new this.model(question);
        const questionObject: any = await newQuestionObject.save();

        return QuestionMongoDBMapper.toEntity(questionObject);
    }

    public async read(question: Question): Promise<Question> {
        const questionObject: any = await this.model.findOne({ name: question.name });

        if (!questionObject) throw Error("Question not found");

        return QuestionMongoDBMapper.toEntity(questionObject);
    }

    public async updatePartial(question: QuestionPartial): Promise<Question> {
        const questionObject: any = await this.model.findByIdAndUpdate(question.id, question, { new: true });

        if (!questionObject) throw Error("Question not found");

        return QuestionMongoDBMapper.toEntity(questionObject);
    }
}
