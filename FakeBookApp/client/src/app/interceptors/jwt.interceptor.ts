import { User } from './../models/user';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User = {token:'', username: '', photoUrl: '', knownAs: ''};
    // add authorization header with jwt token if available
    this.accountService.currentUser$.pipe(take(1)).subscribe((user : User| null) => { if(user)currentUser = user})

    if(currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });

    }

   return next.handle(request);
  }
}
