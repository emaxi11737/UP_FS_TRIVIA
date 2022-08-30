import * as express from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response, httpGet, requestParam, httpPatch } from "inversify-express-utils";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPatch } from 'swagger-express-ts';
import { TYPES } from "@constants/types";
import ResponseObject from '@helpers/ResponseObject';
import ScanService from "@configuration/usecases/ScanService";
import IScanDto from '@application/usecases/scan/IScanDto';
import IScanPatchDto from '@application/usecases/scan/IScanPatchDto';
import ICreateScanUseCase from '@application/usecases/scan/create/IScanCreateUseCase';
import IListScanUseCase from '@application/usecases/scan/list/IScanListUseCase';
import IUpdateScanUseCase from '@application/usecases/scan/update/IScanUpdateUseCase';
import IReadScanUseCase from '@application/usecases/scan/read/IScanReadUseCase';
import IScanListDto from '@application/usecases/scan/IScanListDto';

@ApiPath({
    path: "/scans",
    name: "Scan",
})
@controller("/scans")
export default class ScanController implements interfaces.Controller {
    private readonly scanListUseCase: IListScanUseCase;
    private readonly scanCreateUseCase: ICreateScanUseCase;
    private readonly scanReadUseCase: IReadScanUseCase;
    private readonly scanUpdateUseCase: IUpdateScanUseCase;

    constructor(@inject(TYPES.ScanService) scanService: ScanService) {
        this.scanListUseCase = scanService.getScanListUseCase();
        this.scanCreateUseCase = scanService.getScanCreateUseCase();
        this.scanReadUseCase = scanService.getScanReadUseCase();
        this.scanUpdateUseCase = scanService.getScanUpdateUseCase();
    }

    @ApiOperationGet({
        description: "Get scans objects list",
        parameters: {
            query: {
                username: {
                    description: "Username of scan",
                    required: true,
                    type: "string",
                },
                dpi: {
                    description: "Dpi of scan",
                    required: false,
                    type: "number"
                },
                createdAt: {
                    description: "Created at of scan",
                    required: false,
                    type: "string"
                },
                project: {
                    description: "Project of sample",
                    required: false,
                    type: "string"
                },
                labelName: {
                    description: "Label of sample",
                    required: false,
                    type: "string"
                },
                commodityName: {
                    description: "Commodity of sample",
                    required: false,
                    type: "string"
                },
                sampleId: {
                    description: "Sample id",
                    required: false,
                    type: "number"
                },
                limit: {
                    description: "Limit",
                    required: false,
                    type: "number"
                },
                page: {
                    description: "Page",
                    required: false,
                    type: "number"
                }
            },
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "ScanList" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpGet("/")
    public async list(@request() req: express.Request, @response() res: express.Response) {
        const scanFilterDto: any = req.query;
        const paginationDto: any = req.query;

        return this.scanListUseCase.list(scanFilterDto, paginationDto)
            .then((scanList: IScanListDto) => res.status(200).json(ResponseObject.makeSuccessPaginationResponse(scanList.scans, scanList.pagination)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPost({
        description: "Post scan object",
        parameters: {
            body: { description: "New scan", required: true, model: "Scan" }
        },
        responses: {
            201: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Scan" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPost("/")
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const scanDto: IScanDto = req.body;

        return this.scanCreateUseCase.create(scanDto)
            .then((scan: IScanDto) => res.status(201).json(ResponseObject.makeSuccessResponse(scan)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationGet({
        description: "Get scan object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of scan",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Scan" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpGet("/:id")
    public async read(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        return this.scanReadUseCase.read(id)
            .then((scan: IScanDto) => res.status(200).json(ResponseObject.makeSuccessResponse(scan)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }

    @ApiOperationPatch({
        description: "Patch scan object",
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    description: "Id of scan",
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true
                }
            },
            body: { description: "Update scan", required: true, model: "ScanPatch" }
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Scan" },
            400: { description: "Error", type: SwaggerDefinitionConstant.Response.Type.ARRAY }
        },
    })
    @httpPatch("/:id")
    public async updatePatch(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        const scanPartialDto: IScanPatchDto = req.body;
        scanPartialDto.id = id;

        return this.scanUpdateUseCase.updatePatch(scanPartialDto)
            .then((scan: IScanDto) => res.status(200).json(ResponseObject.makeSuccessResponse(scan)))
            .catch((err: Error) => res.status(400).json(ResponseObject.makeErrorResponse("400", err)));
    }
}
