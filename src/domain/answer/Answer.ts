import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, IsNotEmpty, Matches, IsBoolean, IsOptional } from "class-validator";

@ApiModel({
    name: "Answer"
})

export default class Answer {
    @ApiModelProperty({
        description: "Id of answer",
        required: false,
    })
    public id: string;

    @ApiModelProperty({
        description: "Question id of answer",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public questionId: string;

    @ApiModelProperty({
        description: "Description of answer",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public description: string;

    @ApiModelProperty({
        description: "Set if answer is right",
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    public isRight: boolean;

    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt?: Date | null;

    constructor(
        id: string,
        questionId: string,
        description: string,
        isRight: boolean,
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date
    ) {
        this.id = id;
        this.questionId = questionId;
        this.description = description;
        this.isRight = isRight || false;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
