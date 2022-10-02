import { validate } from 'class-validator';
import IDeleteQuestionCategoryUseCase from '@application/usecases/questioncategory/delete/IDeleteQuestionCategoryUseCase';
import IQuestionCategoryRepository from '@application/repositories/IQuestionCategoryRepository';
import IQuestionRepository from '@application/repositories/IQuestionRepository';
import IAnswerRepository from '@application/repositories/IAnswerRepository';
import QuestionCategoryPatch from '@domain/questioncategory/QuestionCategoryPatch';
import QuestionFilter from '@domain/question/QuestionFilter';
import AnswerFilter from '@domain/answer/AnswerFilter';

export default class DeleteQuestionCategoryUseCase implements IDeleteQuestionCategoryUseCase {

    private questionCategoryRepository: IQuestionCategoryRepository;
    private questionRepository: IQuestionRepository;
    private answerRepository: IAnswerRepository;

    constructor(
        questionCategoryRepository: IQuestionCategoryRepository,
        questionRepository: IQuestionRepository,
        answerRepository: IAnswerRepository,
    ) {
        this.questionCategoryRepository = questionCategoryRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    public async delete(questionCategoryId: string): Promise<void> {
        const questionCategoryPatchEntity = new QuestionCategoryPatch(
            questionCategoryId,
            undefined,
            undefined
        );

        const errors = await validate(questionCategoryPatchEntity);
        if (errors.length > 0) throw Error("Please, check input params");

        const questionCategory = await this.questionCategoryRepository.read(questionCategoryId);
        if (!!questionCategory.deletedAt) return;

        questionCategory.deletedAt = new Date();

        await this.questionCategoryRepository.update(questionCategory);

        // get quetions by questionCategory and update deleted at
        const questionFilter = new QuestionFilter(questionCategory.id);
        const allQuestionsByQuestionCategoryId = await this.questionRepository.findAll(questionFilter);
        for (let questionEntity of allQuestionsByQuestionCategoryId) {
            const question = await this.questionRepository.read(questionEntity.id);
            if (!!question.deletedAt) continue;

            question.deletedAt = new Date();

            const questionDeleted = await this.questionRepository.update(question);
            if (!!questionDeleted) {
                // get answers by questionId and update deleted at
                const answerFilter = new AnswerFilter(question.id);
                const allAnswersByQuestionId = await this.answerRepository.findAll(answerFilter);

                for (let answerEntity of allAnswersByQuestionId) {
                    const answer = await this.answerRepository.read(answerEntity.id);
                    if (!!answer.deletedAt) continue;

                    answer.deletedAt = new Date();

                    await this.answerRepository.update(answer);
                }
            }
        }
    }
}
