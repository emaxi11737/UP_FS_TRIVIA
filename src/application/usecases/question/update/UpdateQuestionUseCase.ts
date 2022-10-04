import { validate } from 'class-validator';
import IUpdateQuestionUseCase from '@application/usecases/question/update/IUpdateQuestionUseCase';
import IQuestionDto from '@application/usecases/question/IQuestionDto';
import IQuestionPatchDto from '@application/usecases/question/IQuestionPatchDto';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import QuestionPatch from '@domain/question/QuestionPatch';

export default class UpdateQuestionUseCase implements IUpdateQuestionUseCase {

    private questionRepository: IQuestionRepository;
    private questionCategoryRepository: IQuestionCategoryRepository;

    constructor(questionRepository: IQuestionRepository,
        questionCategoryRepository: IQuestionCategoryRepository,) {
        this.questionRepository = questionRepository;
        this.questionCategoryRepository = questionCategoryRepository;
    }

    public async updatePartial(questionDto: IQuestionPatchDto): Promise<IQuestionDto> {
        const questionPatchEntity = new QuestionPatch(
            questionDto.id,
            questionDto.name,
            questionDto.description,
            questionDto.questionCategoryId,
            questionDto.level
        );

        const errors = await validate(questionPatchEntity);

        if (errors.length > 0) throw Error("Please, check input params");

        const question = await this.questionRepository.read(questionDto.id);
        if (!!questionPatchEntity.name) question.name = questionPatchEntity.name;
        if (!!questionPatchEntity.description) question.description = questionPatchEntity.description;
        if (!!questionPatchEntity.level) question.level = questionPatchEntity.level;
        if (!!questionPatchEntity.questionCategoryId) {
            const questionCategoryExist = await this.questionCategoryRepository.read(questionPatchEntity.questionCategoryId);
            if (!questionCategoryExist) throw Error("Question category not found");
            question.questionCategoryId = questionPatchEntity.questionCategoryId;
        }
        return await this.questionRepository.update(question);
    }
}
