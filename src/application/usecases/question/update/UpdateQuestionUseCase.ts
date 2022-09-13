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

        const question = await this.questionRepository.read(questionDto.id);
        if (!!questionPatchEntity.name) question.name = questionPatchEntity.name;
        if (!!questionPatchEntity.description) question.description = questionPatchEntity.description;
        if (!!questionPatchEntity.questionCategoryId){ 
            const questionCategoryExist = await this.questionRepository.read(questionPatchEntity.questionCategoryId);
            if (!questionCategoryExist) throw Error("Question category not found");
            question.questionCategoryId = questionPatchEntity.questionCategoryId;
        }
        return await this.questionRepository.update(question);
    }
}
