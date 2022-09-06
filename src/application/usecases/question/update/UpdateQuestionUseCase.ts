import { validate } from 'class-validator';
import IUpdateQuestionUseCase from '@application/usecases/question/update/IUpdateQuestionUseCase';
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionPatchDto from '@application/usecases/question/IQuestionPatchDto';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import QuestionPatch from '@domain/question/QuestionPatch';

export default class UpdateQuestionUseCase implements IUpdateQuestionUseCase {

    private questionRepository: IQuestionRepository;

    constructor(questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
    }

    public async updatePartial(questionDto: IQuestionPatchDto): Promise<IQuestionDto> {
        const questionPatchEntity = new QuestionPatch(
            questionDto.id,
            questionDto.name,
            questionDto.description,
            questionDto.questionCategoryId
        );

        const errors = await validate(questionPatchEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        return await this.questionRepository.updatePartial(questionPatchEntity);
    }
}
