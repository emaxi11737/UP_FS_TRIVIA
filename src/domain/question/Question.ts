import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString } from "class-validator";

@ApiModel({
    name: "Question"
})

export default class Question {
    @ApiModelProperty({
        description: "Id of Question ",
        required: false,
    })
    public id: string;

    @ApiModelProperty({
        description: "Name of Question ",
        required: true,
    })
    @IsString()
    public name: string;

    @ApiModelProperty({
        description: "Description of Question ",
        required: true,
    })
    @IsString()
    public description: string;

    @ApiModelProperty({
        description: "Id of QuestionCategory ",
        required: true,
    })
    @IsString()
    public questionCategoryId: string;

    

    public createdAt: Date;
    public updatedAt: Date;
    deletedAt: Date | null;

    constructor(
        id: string,
        name: string,
        description: string,
        questionCategoryId: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.questionCategoryId = questionCategoryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
