import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsNumber, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

@ApiModel({
    name: "AnswerPatch"
})

export default class AnswerPatch {
    @ApiModelProperty({
        description: "Id of answer",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public id: string;


    @ApiModelProperty({
        description: "Question id of answer",
        required: false,
    })
    @IsString()
    @IsOptional()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public questionId: string;

    @ApiModelProperty({
        description: "Description of answer",
        required: false,
    })
    @IsString()
    @IsOptional()
    public description: string;

    @ApiModelProperty({
        description: "Set if answer is right",
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    public isRight: boolean;

    constructor(
        id: string,
        questionId?: string,
        description?: string,
        isRight?: boolean,
    ) {
        this.id = id;
        if (questionId) this.questionId = questionId;
        if (description) this.description = description;
        if (typeof isRight !== undefined) this.isRight = isRight;
    }
}
