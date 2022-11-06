import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches } from "class-validator";

@ApiModel({
    name: "TokenFilter"
})

export default class TokenFilter {
    @ApiModelProperty({
        description: "Hash of token",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public token?: string;

    constructor(
        token?: string,
    ) {
        this.token = token;
    }
}
