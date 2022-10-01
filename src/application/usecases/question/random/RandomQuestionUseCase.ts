import IRandomQuestionUseCase from '@application/usecases/question/random/IRandomQuestionUseCase';
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';
import IRandomQuestionFilterDto from '@application/usecases/question/IRandomQuestionFilterDto';
import PaginationFilter from '@domain/pagination/PaginationFilter';
import RandomQuestionFilter from '@domain/question/RandomQuestionFilter';
import { validate } from 'class-validator';
import { Console } from 'console';
export default class RandomQuestionUseCase implements IRandomQuestionUseCase {

    private questionRepository: IQuestionRepository;

    constructor(questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
    }

    public async random(paginationDto?: IPaginationFilterDto, questionFilterDto?: IRandomQuestionFilterDto): Promise<IQuestionDto[]> {
        const pagination = new PaginationFilter(
            paginationDto?.limit || 10,
            paginationDto?.page || 0
        );

        let questionFilter;
        if (!!questionFilterDto.questionCategoriesId) {
            questionFilter = new RandomQuestionFilter(questionFilterDto.questionCategoriesId);
            const errors = await validate(questionFilter);
            if (errors.length > 0) throw Error("Please, check input params");
        }

        let questions = this.questionRepository.random(pagination, questionFilter);

        return questions;
    }
}
