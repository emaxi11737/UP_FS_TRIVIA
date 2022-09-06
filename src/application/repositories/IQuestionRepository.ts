import Question from '@domain/question/Question';
import QuestionPatch from '@domain/question/QuestionPatch';

export default interface IQuestionRepository {
    create(question: Question): Promise<Question>;
    read(question: Question): Promise<Question>;
    updatePartial(question: QuestionPatch): Promise<Question>;
}
