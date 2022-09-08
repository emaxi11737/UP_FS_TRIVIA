export default interface IDeleteQuestionCategoryUseCase {
    delete(id: string): Promise<void>;
}
