export default class ResponseObject {
    public static makeSuccessResponse(data: object | object[]): object {
        return {
            "data": data,
        };
    }

    public static makeSuccessPaginationResponse(data: object | object[], pagination: object): object {
        return {
            "data": data,
            "pagination": pagination
        };
    }

    public static makeErrorResponse(status: string, errors: Error): object {
        return {
            "errors": {
                "status": status,
                "title": "An error occurred",
                "details": errors.message,
            }
        }
    }
}
