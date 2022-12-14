import IQuestionDto from '@application/usecases/question/IQuestionDto';
import Question from '@domain/question/Question';

export default class QuestionMongoDBMapper {

    public static toEntity(questionMapper: IQuestionDto): Question {
        const { id, name, description, questionCategoryId, level, createdAt, updatedAt, deletedAt } = questionMapper;

        const questionEntity = new Question(id, name, description, questionCategoryId, level, createdAt, updatedAt, deletedAt);

        return questionEntity;
    }
}
