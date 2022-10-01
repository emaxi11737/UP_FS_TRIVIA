import IDecodeTokenUseCase from '@application/usecases/token/decode/IDecodeTokenUseCase';
import ITokenRepository from '@application/repositories/ITokenRepository';
import IUserDto from '@application/usecases/user/IUserDto';

export default class DecodeTokenUseCase implements IDecodeTokenUseCase {

    private tokenRepository: ITokenRepository;

    constructor(tokenRepository: ITokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public async decode(token: string): Promise<IUserDto> {
        return await this.tokenRepository.decodeToken(token);
    }
}
