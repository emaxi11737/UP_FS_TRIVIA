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

    

    public createdAt: string;
    public updatedAt: string;

    constructor(
        id: string,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
