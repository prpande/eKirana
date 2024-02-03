import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UserCredential } from 'src/app/user/models/userCredential';
import { UserCredentialsFormComponent } from '../../../forms/user-credentials-form/user-credentials-form.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { UserService } from 'src/app/user/services/user.service';
import { GlobalConstants } from 'src/app/app.module';

@Component({
  selector: 'app-new-user-credentials-step',
  templateUrl: './new-user-credentials-step.component.html',
  styleUrls: ['./new-user-credentials-step.component.css']
})
export class NewUserCredentialsStepComponent implements AfterViewInit {

  @ViewChild(UserCredentialsFormComponent) userCredentialForm!: UserCredentialsFormComponent;

  @Output()
  stepCompletedEvent: EventEmitter<UserCredential> = new EventEmitter<UserCredential>();

  constructor(
    private userService: UserService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  createUserCredentials() {
    if (!this.userCredentialForm.done) {
      let userCredentials: UserCredential = this.userCredentialForm.userCredentialGroup.value as UserCredential;

      if (GlobalConstants.IS_TEST_ENV) {
        this.userCredentialForm.markDone();
        this.stepCompletedEvent.emit(userCredentials);
      } else {
        this.userService.createUserCredentials(userCredentials).subscribe(
          {
            next: data => {
              this.userCredentialForm.markDone();
              this.logger.info(`User registered successfully: UserId:[${data.userId}] UserType:[${data.userType}]`)
              let savedCredentials: UserCredential = new UserCredential(data);
              this.snackBar.open(`Successfully registered UserID: [${savedCredentials.userId}]`,
                'OK',
                { duration: 10000, panelClass: ['mat-toolbar', 'mat-warn'], verticalPosition: "top" })
              this.stepCompletedEvent.emit(savedCredentials);
            },
            error: err => {
              this.logger.error(`Error registering UserId:[${userCredentials.userId}]`);
              let response = err as HttpErrorResponse;
              if (response.status == 409) {
                this.logger.error(`Conflict in UserID:[${userCredentials.userId}]`);
                this.snackBar.open(`Unable to register!\nUserID:${userCredentials.userId} already exists!\nPlease try again with a valid UserID.`,
                  'Try Again',
                  { duration: 20000, panelClass: ['mat-toolbar', 'mat-primary'], verticalPosition: "top" })
                this.userCredentialForm.userCredentialGroup.reset();
              }
              else {
                this.restErrorSvc.processPostError(err);
              }
            }
          }
        );
      }
    }
  }
}
