import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsEmail, IsOptional, IsNotEmpty, IsHash } from "class-validator";

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
        required: false,
    })
    @IsString()
    @IsOptional()
    public username: string;

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

    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date | null;

    constructor(
        id: string,
        username: string,
        password: string,
        email: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null,
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
