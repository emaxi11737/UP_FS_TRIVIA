import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches } from "class-validator";

@ApiModel({
    name: "GameRead"
})

export default class GameRead {
    @ApiModelProperty({
        description: "Id of game",
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
