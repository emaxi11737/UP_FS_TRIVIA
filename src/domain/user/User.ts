import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsEmail, IsOptional, IsNotEmpty, IsHash } from "class-validator";
import { Role } from '@constants/role';

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

    @ApiModelProperty({
        description: "Roles of user",
        required: false,
    })
    @IsNotEmpty()
    public roles?: Role[];

    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt?: Date | null;

    constructor(
        id: string,
        username: string,
        password: string,
        email: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date | null,
        roles?: Role[]
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = !!roles && roles.length !== 0 ? roles : [Role.USER];
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
