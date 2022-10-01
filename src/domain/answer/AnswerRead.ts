import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches } from "class-validator";

@ApiModel({
    name: "AnswerRead"
})

export default class AnswerRead {
    @ApiModelProperty({
        description: "Id of answer",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public id: string;

    constructor(
        id: string,
    ) {
        this.id = id;
    }
}
