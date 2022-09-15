export default interface IVerifyTokenUseCase {
    verify(token: string): Promise<boolean>;
}
