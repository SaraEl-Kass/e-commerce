import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = ''
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`
        } else {
          errorMessage = `Server error: ${error.message}`
          switch (error.status) {
            case 400:
              errorMessage = `Bad Request: ${error.error.message}`
              break
            case 401:
              errorMessage = `Unauthorized: ${error.error.message}`
              this.router.navigate(['/login'])
              break
            case 403:
              errorMessage = `Forbidden: ${error.error.message}`
              break
            case 404:
              errorMessage = `Not Found: ${error.error.message}`
              break
            case 500:
              errorMessage = `Internal Server Error: ${error.error.message}`
              break
            default:
              errorMessage = `Unexpected error: ${error.message}`
          }
        }
        console.error(errorMessage)
        return throwError(errorMessage)
      })
    )
  }
}
