import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsNumber, IsNotEmpty } from "class-validator";

@ApiModel({
    name: "GamePatch"
})

export default class GamePatch {
    @ApiModelProperty({
        description: "Id of game",
        required: true,
    })
    @IsString()
    @Matches(/^[0-9a-fA-F]{24}$/)
    public id: string;

    @ApiModelProperty({
        description: "Score of game",
        required: false,
    })

    @IsNumber()
    @IsNotEmpty()
    public score: number;

    @ApiModelProperty({
        description: "Level of game",
        required: false,
    })
    @IsNumber()
    @IsNotEmpty()
    public level: number;


    constructor(
        id: string,
        score?: number,
        level?: number,
    ) {
        this.id = id;
        if (score) this.score = score;
        if (level) this.level = level;
    }
}
