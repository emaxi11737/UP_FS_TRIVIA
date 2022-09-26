import IListQuestionUseCase from '@application/usecases/question/list/IListQuestionUseCase';
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IPaginationFilterDto from '@application/usecases/pagination/IPaginationFilterDto';
import IQuestionFilterDto from '@application/usecases/question/IQuestionFilterDto';
import PaginationFilter from '@domain/pagination/PaginationFilter';
import QuestionFilter from '@domain/question/QuestionFilter';
import { validate } from 'class-validator';
export default class ListQuestionUseCase implements IListQuestionUseCase {

    private questionRepository: IQuestionRepository;

    constructor(questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
    }

    public async list(paginationDto?: IPaginationFilterDto, questionFilterDto?: IQuestionFilterDto): Promise<IQuestionDto[]> {
        const pagination = new PaginationFilter(
            paginationDto?.limit || 10,
            paginationDto?.page || 0
        );

        let questionFilter;
        if (!!questionFilterDto.questionCategoryId) {
            questionFilter = new QuestionFilter(questionFilterDto.questionCategoryId);
            const errors = await validate(questionFilter);
            if (errors.length > 0) throw Error("Please, check input params");
        }

        return await this.questionRepository.list(pagination, questionFilter);
    }
}
