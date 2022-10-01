import IRandomQuestionUseCase from '@application/usecases/question/random/IRandomQuestionUseCase';
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import IRandomQuestionFilterDto from '@application/usecases/question/IRandomQuestionFilterDto';
import RandomQuestionFilter from '@domain/question/RandomQuestionFilter';
import { validate } from 'class-validator';
import QuestionCategoryRead from '@domain/questioncategory/QuestionCategoryRead';

export default class RandomQuestionUseCase implements IRandomQuestionUseCase {

    private questionRepository: IQuestionRepository;
    private questionCategoryRepository: IQuestionCategoryRepository;
    
    constructor(questionRepository: IQuestionRepository, questionCategoryRepository: IQuestionCategoryRepository) {
        this.questionRepository = questionRepository;
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public async random(randomQuestionFilterDto?: IRandomQuestionFilterDto): Promise<IQuestionDto[]> {
    
        let questionFilter;
        if (!!randomQuestionFilterDto.questionCategoriesId) {
            for(var questionCategory of randomQuestionFilterDto.questionCategoriesId){
                const randomQuestionCategoryReadEntity = new QuestionCategoryRead(
                    questionCategory,
                );
                const errors = await validate(randomQuestionCategoryReadEntity);
                if (errors.length > 0) throw Error("Please, check input params");
                let questionCategoryExist = await this.questionCategoryRepository.read(questionCategory);
                if (!questionCategoryExist) throw Error("Question category not found");
            }
            questionFilter = new RandomQuestionFilter(randomQuestionFilterDto.questionCategoriesId,randomQuestionFilterDto.level,randomQuestionFilterDto.size);
            const errors = await validate(questionFilter);
            if (errors.length > 0) throw Error("Please, check input params");
        }

       

        let questions = this.questionRepository.random(questionFilter);

        return questions;
    }
}
