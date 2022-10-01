import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches } from "class-validator";

@ApiModel({
    name: "QuestionCategoryRead"
})

export default class QuestionCategoryRead {
    @ApiModelProperty({
        description: "Id of question category",
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
