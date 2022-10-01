import { LEVELS } from "@constants/levels";

export default interface IQuestionDto {
    id: string;
    name: string;
    description: string;
    questionCategoryId: string;
    level: LEVELS;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
