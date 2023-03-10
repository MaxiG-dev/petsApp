import { HttpException } from '@nestjs/common';

export class DataBaseException extends HttpException {
  constructor(response: string, status: number) {
    super(response as string, status);
  }
}
