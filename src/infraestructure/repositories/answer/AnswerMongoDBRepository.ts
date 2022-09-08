import { Model } from 'mongoose';
import { injectable } from 'inversify';
import AnswerMongoDBModel from '@infraestructure/repositories/answer/AnswerMongoDBModel';
import AnswerMongoDBMapper from '@infraestructure/repositories/answer/AnswerMongoDBMapper';
import IAnswerMongoDB from '@infraestructure/repositories/answer/IAnswerMongoDB';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import Answer from '@domain/answer/Answer';
import Filter from '@domain/filter/Filter';
import PaginationFilter from '@domain/pagination/PaginationFilter';

@injectable()
export default class AnswerMongoDBRepository implements IAnswerRepository {

    private model: Model<IAnswerMongoDB>;

    constructor() {
        this.model = AnswerMongoDBModel;
    }

    public async list(pagination: PaginationFilter, filters?: Filter): Promise<Answer[]> {
        const answerResults = await this.model.find()
            .sort({ createdAt: 'asc' })
            .skip(pagination.page * pagination.limit)
            .limit(pagination.limit);

        return answerResults.map((answerModel: any) => AnswerMongoDBMapper.toEntity(answerModel));
    }

    public async create(answer: Answer): Promise<Answer> {
        const newAnswerObject = new this.model(answer);
        const answerObject: any = await newAnswerObject.save();

        return AnswerMongoDBMapper.toEntity(answerObject);
    }

    public async read(answerId: string): Promise<Answer> {
        const answerObject: any = await this.model.findById({ _id: answerId });

        if (!answerObject) throw Error("Answer not found");

        return AnswerMongoDBMapper.toEntity(answerObject);
    }

    public async update(answer: Answer): Promise<Answer> {
        const answerObject: any = await this.model.findByIdAndUpdate(answer.id, answer, { new: true });

        if (!answerObject) throw Error("Answer not found");

        return AnswerMongoDBMapper.toEntity(answerObject);
    }
}
