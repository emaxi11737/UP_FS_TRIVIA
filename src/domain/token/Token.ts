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
    @IsNotEmpty()
    @IsString()
    public userId: string;

    @ApiModelProperty({
        description: "Name of user",
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    public username: string;

    constructor(
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
        userId: string,
        username: string
    ) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.userId = userId;
        this.username = username;
    }
}
