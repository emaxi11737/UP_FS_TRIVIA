import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsHash, IsEmail } from "class-validator";

@ApiModel({
    name: "User"
})

export default class User {
    @ApiModelProperty({
        description: "Id of user",
        required: false,
    })
    public id: string;

    @ApiModelProperty({
        description: "Name of user",
        required: true,
    })
    @IsString()
    public username: string;

    @ApiModelProperty({
        description: "Password of user",
        required: true,
    })
    @IsString()
    @IsHash("md5")
    public password: string;

    @ApiModelProperty({
        description: "Email of user",
        required: true,
    })
    @IsEmail()
    public email: string;

    public createdAt: string;
    public updatedAt: string;

    constructor(
        id: string,
        username: string,
        password: string,
        email: string,
        createdAt: string,
        updatedAt: string,
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}