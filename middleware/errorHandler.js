import { HTTP_STATUS } from "../utils/Constants.js";

export const errorHandler = (err, req, res, next) => {
    console.log("Error: " + err.stack.red);
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case HTTP_STATUS.VALIDATION_ERROR:
            res.json({
                title: 'Validation Error',
                message: err.message,
                stackTrace: err.stack
            })
            break
        case HTTP_STATUS.SERVER_ERROR:
            res.json({
                title: 'Server Error',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case HTTP_STATUS.NOT_FOUND:
            res.json({
                title: 'Not Found',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case HTTP_STATUS.FORBIDDEN:
            res.json({
                title: 'Forbidden',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case HTTP_STATUS.UNAUTHORIZED:
            res.json({
                title: 'Unauthorized',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case HTTP_STATUS.CREATED:
            res.json({
                title: 'Created',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        case HTTP_STATUS.SUCCESS:
            res.json({
                title: 'Success',
                message: err.message,
                stackTrace: err.stack
            })
            break;
        default:
            res.json({
                title: 'Server Error',
                message: err.message,
                stackTrace: err.stack
            })
    }
}