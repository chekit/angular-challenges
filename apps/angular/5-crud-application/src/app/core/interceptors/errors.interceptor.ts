import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { GlobalErrorService } from '../services/error.service';

export function errorsInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const errorService = inject(GlobalErrorService);
  console.log('<---');

  return next(req).pipe(
    tap(() => errorService.resetError()),
    catchError((error) => {
      errorService.setError(error.message ?? 'Unknown error');

      return EMPTY;
    }),
  );
}
