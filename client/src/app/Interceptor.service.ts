// @Injectable({
//   providedIn: 'root'
// })
import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest, HttpErrorResponse, HttpHeaderResponse, HttpResponse} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor{
  constructor(private auth: AuthService, private router: Router){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<|HttpHeaderResponse| HttpResponse<any>> {
      return next.handle(request).pipe(mergeMap((event: any) => {
          return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          this.auth.logout();
          this.router.navigate(['login']);
        } 
        return of(event);
      }))
    }
}
