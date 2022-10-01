export default interface IQuestionMongoDB {
    name?: string;
    description?: string;
    questionCategoryId?: string;
    level?: number;
    deletedAt?: Date;
}
