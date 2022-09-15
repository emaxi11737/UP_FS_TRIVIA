import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsEmail, IsNotEmpty, IsHash } from "class-validator";

@ApiModel({
    name: "UserSignIn"
})

export default class UserSignIn {
    @ApiModelProperty({
        description: "Password of user",
        required: true,
    })

    @IsString()
    @IsNotEmpty()
    @IsHash("md5")
    public password: string;

    @ApiModelProperty({
        description: "Email of user",
        required: true,
    })
    @IsEmail()
    public email: string;

    constructor(
        password: string,
        email: string
    ) {
        this.password = password;
        this.email = email;
    }
}
