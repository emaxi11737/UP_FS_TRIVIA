import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsOptional, IsHash } from "class-validator";

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
        description: "Name of user",
        required: false,
    })
    @IsString()
    @IsOptional()
    public username?: string;

    @ApiModelProperty({
        description: "Old password of user",
        required: false,
    })
    @IsString()
    @IsOptional()
    @IsHash("md5")
    public oldPassword?: string;

    @ApiModelProperty({
        description: "New password of user",
        required: false,
    })
    @IsString()
    @IsOptional()
    @IsHash("md5")
    public newPassword?: string;

    constructor(
        id: string,
        username?: string,
        oldPassword?: string,
        newPassword?: string
    ) {
        this.id = id;
        this.username = username;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
