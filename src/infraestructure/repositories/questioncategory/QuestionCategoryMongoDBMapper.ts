import IQuestionCategoryDto from '@application/usecases/questioncategory/IQuestionCategoryDto';
import QuestionCategory from '@domain/questioncategory/QuestionCategory';

export default class QuestionCategoryMongoDBMapper {

    public static toEntity(questionCategoryMapper: IQuestionCategoryDto): QuestionCategory {
        const { id, name, description, createdAt, updatedAt } = questionCategoryMapper;

        const questionCategoryEntity = new QuestionCategory(id, name, description, createdAt, updatedAt);

        return questionCategoryEntity;
    }
}
