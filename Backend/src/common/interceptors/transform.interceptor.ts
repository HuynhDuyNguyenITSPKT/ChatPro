import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private reflector: Reflector) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const customMessage = this.reflector.get<string>(
      RESPONSE_MESSAGE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          ('success' in data || 'message' in data || 'data' in data)
        ) {
          return {
            success: data.success ?? true,
            message: data.message ?? customMessage ?? 'Success',
            data: data.data !== undefined ? data.data : null,
          };
        }

        return {
          success: true,
          message: customMessage ?? 'Success',
          data: data !== undefined ? data : null,
        };
      }),
    );
  }
}
