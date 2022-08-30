import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsEmail, Matches } from "class-validator";

@ApiModel({
    name: "UserPatch"
})

export default class UserPatch {
    @ApiModelProperty({
        description: "Id of user",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public id: string;

    @ApiModelProperty({
        description: "Email of user",
        required: true,
    })
    @IsEmail()
    public email: string;

    constructor(
        id: string,
        email: string,
    ) {
        this.id = id;
        this.email = email;
    }
}
