import {ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus} from '@nestjs/common';
import { Response } from 'express';   
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse:any = exception.getResponse();

   
    if (status === HttpStatus.BAD_REQUEST) {
        if (Array.isArray(errorResponse['message'])) {
            const formattedErrors = errorResponse['message'].reduce((acc: any, error: ValidationError) => {
                acc[error.property] = Object.values(error.constraints);
                return acc;
            }, {});

            const formattedResponse = {
                message: 'Validation failed',
                errors: formattedErrors,
                statusCode: status,
            };
            return response.status(status).json(formattedResponse);
        }

        const formattedResponse = {
            message: errorResponse['message'] || 'Validation failed',
            errors: errorResponse['errors'] || {},
            statusCode: status,
        };
        return response.status(status).json(formattedResponse);
    }

    // Default response for other HTTP exceptions
    response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: response.req.url,
        message: errorResponse['message'] || exception.message,
    });
  }

}