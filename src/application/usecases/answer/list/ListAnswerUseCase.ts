import IListAnswerUseCase from '@application/usecases/answer/list/IListAnswerUseCase';
import IAnswerDto from '@application/usecases/answer/IAnswerDto';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';
import IAnswerFilterDto from '@application/usecases/answer/IAnswerFilterDto';
import PaginationFilter from '@domain/pagination/PaginationFilter';
import AnswerFilter from '@domain/answer/AnswerFilter';
import { validate } from 'class-validator';

export default class ListAnswerUseCase implements IListAnswerUseCase {

    private answerRepository: IAnswerRepository;

    constructor(answerRepository: IAnswerRepository) {
        this.answerRepository = answerRepository;
    }

    public async list(paginationDto?: IPaginationFilterDto, answerFilterDto?: IAnswerFilterDto): Promise<IAnswerDto[]> {
        const pagination = new PaginationFilter(
            paginationDto?.limit || 10,
            paginationDto?.page || 0
        );
            
        let answerFilter;
        if (!!answerFilterDto.questionId) {
            answerFilter = new AnswerFilter(answerFilterDto.questionId);
            const errors = await validate(answerFilter);
            if (errors.length > 0) throw Error("Please, check input params");
        }

        return await this.answerRepository.list(pagination, answerFilter);
    }
}
