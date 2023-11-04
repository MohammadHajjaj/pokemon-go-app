import { HttpStatus } from '@nestjs/common';

export enum PrismaErrorType {
  NotFoundError = 'NotFoundError',
  UniqueConstraintViolation = 'BadRequestError',
  GenericError = 'InternalServerError',
}

export const PrismaErrorsEnum = {
  [PrismaErrorType.NotFoundError]: {
    message: 'Prisma entity not found error.',
    name: PrismaErrorType.NotFoundError,
    code: 1006,
    status: HttpStatus.NOT_FOUND,
  },
  [PrismaErrorType.UniqueConstraintViolation]: {
    message: 'Prisma unique constraint violation.',
    name: PrismaErrorType.UniqueConstraintViolation,
    code: 1007,
    status: HttpStatus.BAD_REQUEST,
  },
  [PrismaErrorType.GenericError]: {
    message: 'Prisma DB error.',
    name: PrismaErrorType.GenericError,
    code: 1008,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};

export type PrismaErrorKey = keyof typeof PrismaErrorsEnum;

export interface PrismaErrorResponse {
  message: string;
  name: PrismaErrorType;
  code: number;
  status: HttpStatus;
}
