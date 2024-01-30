import { Injectable } from '@angular/core';
import { UserCredential } from '../models/userCredential';
import { UserType } from '../models/userType';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { UserRestEndpointsService } from './user-rest-endpoints.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { BehaviorSubject, Observable, Subscription, catchError } from 'rxjs';

export type UserCredentialData = {
  credentials?: UserCredential;
  jwt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SystemCredentials: UserCredential = {
    userId: "1cee9bc9-502d-4fdc-ad0b-960636546fce",
    userType: UserType.SYSTEM,
    password: ''
  }
  SystemToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxY2VlOWJjOS01MDJkLTRmZGMtYWQwYi05NjA2MzY1NDZmY2UiLCJ1c2VyVHlwZSI6IlNZU1RFTSIsInVzZXJJZCI6IjFjZWU5YmM5LTUwMmQtNGZkYy1hZDBiLTk2MDYzNjU0NmZjZSIsImlhdCI6MTcwNjUwOTg0OX0.7JVolbjedPcrfqMrdN9I002T6uiGpD0Tv-cew1dWgrY";

  private _userCredential$ = new BehaviorSubject<UserCredentialData>({});

  private subscriptions: Subscription[] = [];

  constructor(private httpCLient: HttpClient, private restErrorSvc: RestErrorHandlerService, private logger: LoggerService) {
  }

  get UserCredentials() { return this.userCredential$.value.credentials; }
  get UserJwt() { return this.userCredential$.value.jwt; }
  get userCredential$() {return this._userCredential$;}

  get isLoggedIn(): boolean {
    return this.UserJwt != undefined;
  }

  private refreshSubject(){
    this._userCredential$ = new BehaviorSubject<UserCredentialData>({});
  }

  login(userCredential: UserCredential) {
    this.refreshSubject();
    this.subscriptions.push(this.httpCLient.post(UserRestEndpointsService.LOGIN, userCredential, { responseType: 'text' })
    .subscribe(
      {
        next: data => {
          let credentialData: UserCredentialData = {
            credentials: userCredential,
            jwt: data
          };
          this.logger.info(`Logged in: User:[${userCredential.userId}] UserType:[${userCredential.userType}]`);
          this.userCredential$.next(credentialData);
        },
        error: err => {
          this.logger.error(`Error logging in: User:[${userCredential.userId}] UserType:[${userCredential.userType}]`);
          let response = err as HttpErrorResponse;
          if (response.status == 401) {
            this.userCredential$.error(err);
          }
          else {
            this.restErrorSvc.processPostError(err);
          }
        }
      }
    ));
  }

  logout() {
    this.logger.info(`Log Out: User:[${this.UserCredentials?.userId}] UserType:[${this.UserCredentials?.userType}]`)
    this.userCredential$.next({});
  }
}
