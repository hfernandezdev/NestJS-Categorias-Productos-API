import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse } from './api-response.interface';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  private readonly logger = new Logger(ApiResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const now = Date.now();

    return next.handle().pipe(
      tap(data => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const message = this.getMessage(statusCode);

        this.logger.log(`Request URL: ${context.switchToHttp().getRequest().url} - Status Code: ${statusCode} - Response Time: ${Date.now() - now}ms`);

        response.status(statusCode).json({
          statusCode,
          message,
          data: data,
        });
      }),
    );
  }

  private getMessage(statusCode: number): string {
    switch (statusCode) {
      case 200:
        return 'Success';
      case 201:
        return 'Created';
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 404:
        return 'Not Found';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Unknown';
    }
  }
}
