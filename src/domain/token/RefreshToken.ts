import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsNotEmpty } from "class-validator";

@ApiModel({
    name: "RefreshToken"
})

export default class RefreshToken {
    @ApiModelProperty({
        description: "Refresh token of user",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public refreshToken: string;


    constructor(
        refreshToken: string,
    ) {
        this.refreshToken = refreshToken;
    }
}
