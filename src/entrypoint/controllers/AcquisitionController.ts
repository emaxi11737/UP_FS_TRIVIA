import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, httpGet, httpPatch, requestParam } from "inversify-express-utils";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPatch } from 'swagger-express-ts';
import AcquisitionService from "@configuration/usecases/AcquisitionService";
import AcquisitionTrackingService from "@configuration/usecases/AcquisitionTrackingService";
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import IAcquisitionDto from "@application/usecases/acquisition/IAcquisitionDto";
import IAcquisitionListUseCase from '@application/usecases/acquisition/list/IAcquisitionListUseCase';
import IAcquisitionCreateUseCase from '@application/usecases/acquisition/create/IAcquisitionCreateUseCase';
import IAcquisitionUpdateUseCase from '@application/usecases/acquisition/update/IAcquisitionUpdateUseCase';
import IAcquisitionPatchDto from '@application/usecases/acquisition/IAcquisitionPatchDto';
import IAcquisitionGetUseCase from "@application/usecases/acquisition/get/IAcquisitionGetUseCase";

@ApiPath({
    path: "/acquisitions",
    name: "Acquisition",
})
@controller("/acquisitions")
export default class AcquisitionController implements interfaces.Controller {
    private readonly acquisitionListUseCase: IAcquisitionListUseCase;
    private readonly acquisitionCreateUseCase: IAcquisitionCreateUseCase;
    private readonly acquisitionUpdateUseCase: IAcquisitionUpdateUseCase;
    private readonly acquisitionTrackingGetUseCase: IAcquisitionGetUseCase;

    constructor(@inject(TYPES.AcquisitionService) acquisitionService: AcquisitionService,
        @inject(TYPES.AcquisitionTrackingService) acquisitionTrackingService: AcquisitionTrackingService) {
        this.acquisitionListUseCase = acquisitionService.getAcquisitionListUseCase()
        this.acquisitionCreateUseCase = acquisitionService.getAcquisitionCreateUseCase();
        this.acquisitionUpdateUseCase = acquisitionService.getAcquisitionUpdateUseCase();
        this.acquisitionTrackingGetUseCase = acquisitionTrackingService.getAcquisitionTrackingListUseCase();
    }

    @ApiOperationGet({
        description: "Get acquisitions objects list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Acquisition" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpGet("/")
    public async list(@request() req: express.Request, @response() res: express.Response) {
        return this.acquisitionListUseCase.list()
            .then((acquisitions: IAcquisitionDto[]) => res.status(200).json(ResponseObject.makeSuccessResponse(acquisitions)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPost({
        description: "Post acquisition object",
        parameters: {
            body: { description: "New acquisition", required: true, model: "Acquisition" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Acquisition" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPost("/")
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const acquisitionDto: IAcquisitionDto = req.body;

        return this.acquisitionCreateUseCase.create(acquisitionDto)
            .then((acquisition: IAcquisitionDto) => res.status(201).json(ResponseObject.makeSuccessResponse(acquisition)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPatch({
        description: "Patch acquisition object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of acquisition",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
            body: { description: "Update acquisition", required: true, model: "AcquisitionPatch" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Acquisition" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPatch("/:id")
    public async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        const acquisitionPartialDto: IAcquisitionPatchDto = req.body;
        acquisitionPartialDto.id = id;

        return this.acquisitionUpdateUseCase.updatePatch(acquisitionPartialDto)
            .then((acquisition: IAcquisitionDto) => res.status(200).json(ResponseObject.makeSuccessResponse(acquisition)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "Get acquisition tracking",
        path: "/processed",
        parameters: {
            query: {
                user: {
                    description: "User name acquisition",
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING
                },
                date: {
                    description: "Date of acquisitions processed",
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING
                }
            }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Acquisition" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpGet("/processed")
    public async get(@request() req: express.Request, @response() res: express.Response) {
        const processedAcquisitionsFilter: any = req.query;
        return this.acquisitionTrackingGetUseCase.get(processedAcquisitionsFilter)
            .then((acquisitions: IAcquisitionDto[]) => res.status(200).json(ResponseObject.makeSuccessResponse(acquisitions)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
