import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, httpGet, httpDelete, requestParam } from "inversify-express-utils";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationDelete } from 'swagger-express-ts';
import SampleService from "@configuration/usecases/SampleService";
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import ISampleDto from "@application/usecases/sample/ISampleDto";
import IListSampleUseCase from '@application/usecases/sample/list/ISampleListUseCase';
import ICreateBulkSampleUseCase from '@application/usecases/sample/create/ISampleCreateBulkUseCase';
import IDeleteBulkSampleUseCase from '@application/usecases/sample/delete/ISampleDeleteBulkUseCase';
import ISampleDeleteDto from '@application/usecases/sample/ISampleDeleteDto';
import ISampleListDto from '@application/usecases/sample/ISampleListDto';

@ApiPath({
    path: "/samples",
    name: "Sample",
})
@controller("/samples")
export default class SampleController implements interfaces.Controller {
    private readonly sampleListUseCase: IListSampleUseCase;
    private readonly sampleCreateBulkUseCase: ICreateBulkSampleUseCase;
    private readonly sampleDeleteBulkUseCase: IDeleteBulkSampleUseCase;
    
    constructor(@inject(TYPES.SampleService) sampleService: SampleService) {
        this.sampleListUseCase = sampleService.getSampleListUseCase()
        this.sampleCreateBulkUseCase = sampleService.getSampleCreateBulkUseCase();
        this.sampleDeleteBulkUseCase = sampleService.getSampleDeleteBulkUseCase();
    }

    @ApiOperationGet({
        description: "Get samples objects list",
        parameters: {
            query: {
                project: {
                    description: "Project of sample" ,
                    required: false,
                    type: "string",
                },
                sampleId: {
                    description: "Sample id of relational database" ,
                    required: false,
                    type: "number",
                },
                countryName: {
                    description: "Country name of sample" ,
                    required: false,
                    type: "string",
                },
                regionName: {
                    description: "Region name of sample" ,
                    required: false,
                    type: "string",
                },
                senderName: {
                    description: "Sender name of sample" ,
                    required: false,
                    type: "string",
                },
                username: {
                    description: "Username of sample" ,
                    required: true,
                    type: "string",
                },
                labelName: {
                    description: "Label name of sample" ,
                    required: false,
                    type: "string",
                },
                commodityName: {
                    description: "Commodity name of sample" ,
                    required: false,
                    type: "string",
                },
                limit: {
                    description : "Limit" ,
                    required : false,
                    type: "number"
                },
                page: {
                    description : "Page" ,
                    required : false,
                    type: "number"
                } 
            }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "SampleList" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpGet("/")
    public async list(@request() req: express.Request, @response() res: express.Response) {
        const sampleFilterDto: any = req.query;
        const paginationDto: any = req.query;
        
        return this.sampleListUseCase.list(sampleFilterDto, paginationDto)
            .then((sampleList: ISampleListDto) => res.status(200).json(ResponseObject.makeSuccessPaginationResponse(sampleList.samples, sampleList.pagination)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPost({
        description: "Post sample bulk",
        path: "/bulk",
        parameters : {
            body : { description : "New samples", required : true, model: "Sample" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Sample" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPost("/bulk")
    public async createBulk(@request() req: express.Request, @response() res: express.Response) {
        const sampleDto: ISampleDto[] = req.body;
        
        return this.sampleCreateBulkUseCase.createBulk(sampleDto)
            .then((samples: ISampleDto[]) => res.status(201).json(ResponseObject.makeSuccessResponse(samples)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationDelete({
        description: "Delete sample bulk",
        path: "/bulk/{username}",
        parameters : {
            path : {
                username : {
                    description : "Username of samples to delete",
                    type : SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required : true
                }
            }
        },     
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Sample" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpDelete("/bulk/:username")
    public async deleteBulk(@requestParam("username") username: string, @request() req: express.Request, @response() res: express.Response) {
        let sampleDto: ISampleDeleteDto = req.body;
        sampleDto.username = username;

        return this.sampleDeleteBulkUseCase.deleteBulk(sampleDto)
            .then((sample: ISampleDeleteDto) => res.status(200).json(ResponseObject.makeSuccessResponse({"success": true})))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
