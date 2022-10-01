import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IsString, Matches, IsNumber, IsNotEmpty, IsEnum } from "class-validator";
import { LEVELS } from '@constants/levels';

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
        enum: [String(LEVELS.LEVEL_1), String(LEVELS.LEVEL_2), String(LEVELS.LEVEL_3)]
    })
    @IsEnum(LEVELS)
    @IsNotEmpty()
    public level: LEVELS;

    constructor(
        id: string,
        score?: number,
        level?: LEVELS,
    ) {
        this.id = id;
        if (score) this.score = score;
        if (level) this.level = level;
    }
}
