import IQuestionDto from '@application/usecases/question/IQuestionDto';

export default interface ICreateQuestionUseCase {
    create(questionDto: IQuestionDto): Promise<IQuestionDto>;
}
