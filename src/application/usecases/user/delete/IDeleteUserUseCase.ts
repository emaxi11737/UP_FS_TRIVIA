export default interface IDeleteUserUseCase {
    delete(id: string): Promise<void>;
}
