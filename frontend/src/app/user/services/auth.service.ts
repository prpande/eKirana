import { Injectable } from '@angular/core';
import { UserCredential } from '../models/userCredential';
import { UserType } from '../models/userType';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { UserRestEndpointsService } from './user-rest-endpoints.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { BehaviorSubject, Observable, Subscription, catchError } from 'rxjs';

export type LoggedInCredentialData = {
  credentials?: UserCredential;
  jwt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  PublicCredentials: UserCredential = new UserCredential({
    userId: "c139c5ce-4ab3-4bc3-81b7-c2256390e0cc",
    userType: UserType.PUBLIC,
    password: ''
  });

  SystemCredentials: UserCredential = new UserCredential({
    userId: "1cee9bc9-502d-4fdc-ad0b-960636546fce",
    userType: UserType.SYSTEM,
    password: ''
  });
  SystemToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxY2VlOWJjOS01MDJkLTRmZGMtYWQwYi05NjA2MzY1NDZmY2UiLCJ1c2VyVHlwZSI6IlNZU1RFTSIsInVzZXJJZCI6IjFjZWU5YmM5LTUwMmQtNGZkYy1hZDBiLTk2MDYzNjU0NmZjZSIsImlhdCI6MTcwNjUwOTg0OX0.7JVolbjedPcrfqMrdN9I002T6uiGpD0Tv-cew1dWgrY";

  private _loggedInCredential$ = new BehaviorSubject<LoggedInCredentialData>({});
  private _userIdValidation$ = new BehaviorSubject<string | undefined>(undefined);
  private _loggedInStatusStream$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpCLient: HttpClient, private restErrorSvc: RestErrorHandlerService, private logger: LoggerService) {

  }

  get UserCredentials(): UserCredential {
    if (this.isLoggedIn && this.userCredential$.value.credentials) {
      return this.userCredential$.value.credentials;
    } else {
      return this.PublicCredentials;
    }
  }
  get UserJwt() { return this.userCredential$.value.jwt; }
  get userCredential$() { return this._loggedInCredential$; }
  get userIdValidation$() { return this._userIdValidation$; }
  get loggedInStatusStream$() { return this._loggedInStatusStream$; }

  get isLoggedIn(): boolean {
    return this.UserJwt != undefined;
  }

  private refreshUserCredentialSubject() {
    this._loggedInCredential$ = new BehaviorSubject<LoggedInCredentialData>({});
  }

  private refreshUserIdValidationSubject() {
    this._userIdValidation$ = new BehaviorSubject<string | undefined>(undefined);
  }

  login(userCredential: UserCredential) {
    this.refreshUserCredentialSubject();
    this.httpCLient.post(UserRestEndpointsService.LOGIN, userCredential, { responseType: 'text' })
      .subscribe(
        {
          next: data => {
            let credentialData: LoggedInCredentialData = {
              credentials: userCredential,
              jwt: data
            };
            this.logger.info(`Logged in: User:[${userCredential.userId}] UserType:[${userCredential.userType}]`);
            this.userCredential$.next(credentialData);
            this._loggedInStatusStream$.next(true);
          },
          error: err => {
            this._loggedInStatusStream$.next(false);
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
      );
  }

  logout() {
    this.logger.info(`Log Out: User:[${this.UserCredentials?.userId}] UserType:[${this.UserCredentials?.userType}]`)
    this.userCredential$.next({});
    this._loggedInStatusStream$.next(false);
  }

  checkUserId(userId: string) {
    this.refreshUserIdValidationSubject();
    this.httpCLient.post(UserRestEndpointsService.CHECK_USER_ID, userId, { responseType: 'text' })
      .subscribe(
        {
          next: data => {
            this.logger.info(`Valid UserId:[${data}]`);
            this.userIdValidation$.next(data);
          },
          error: err => {
            this.logger.error(`Error in validating UserId:[${userId}]`);
            let response = err as HttpErrorResponse;
            if (response.status == 409) {
              this.userIdValidation$.error(err);
            }
            else {
              this.restErrorSvc.processPostError(err);
            }
          }
        }
      );
  }
}
