import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString } from "class-validator";

@ApiModel({
    name: "QuestionCategory"
})

export default class QuestionCategory {
    @ApiModelProperty({
        description: "Id of Question Category",
        required: false,
    })
    public id: string;

    @ApiModelProperty({
        description: "Name of Question Category",
        required: true,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: "Description of Question Category",
        required: true,
    })
    @IsString()
    public description: string;

    

    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt?: Date | null;

    constructor(
        id: string,
        name: string,
        description: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date | null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
