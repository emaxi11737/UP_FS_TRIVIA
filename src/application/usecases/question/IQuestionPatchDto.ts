import { LEVELS } from '@constants/levels';

export default interface IQuestionPatchDto {
    id: string;
    name?: string;
    description?: string;
    questionCategoryId?: string;
    level?: LEVELS;
}
