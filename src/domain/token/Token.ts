import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

@ApiModel({
    name: "Token"
})

export default class Token {
    @ApiModelProperty({
        description: "Access token of user",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public accessToken: string;

    @ApiModelProperty({
        description: "Refresh token of user",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public refreshToken: string;

    @ApiModelProperty({
        description: "Expires token of user",
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    public expiresIn: number;

    @ApiModelProperty({
        description: "Id of user",
        required: true,
    })
    public userId: string;

    constructor(
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
        userId: string,
    ) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.userId = userId;
    }
}
