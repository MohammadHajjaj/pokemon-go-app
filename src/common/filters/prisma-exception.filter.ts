import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaErrorsEnum,
  PrismaErrorResponse,
  PrismaErrorType,
} from '../errors/prisma-errors';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let errorResponse: PrismaErrorResponse;

    switch (exception.code) {
      case 'P2002':
        errorResponse =
          PrismaErrorsEnum[PrismaErrorType.UniqueConstraintViolation];
        break;
      case 'P2025':
      case 'P2003':
        errorResponse = PrismaErrorsEnum[PrismaErrorType.NotFoundError];
        break;
      default:
        errorResponse = PrismaErrorsEnum[PrismaErrorType.GenericError];
    }

    response.status(errorResponse.status).json({
      statusCode: errorResponse.status,
      message: errorResponse.message,
      error: errorResponse.name,
    });
  }
}
