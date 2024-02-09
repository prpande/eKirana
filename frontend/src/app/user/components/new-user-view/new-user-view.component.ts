import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { UserCredential } from '../../models/userCredential';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { GlobalConstants } from 'src/app/app.module';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { UserType } from '../../models/userType';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';
import { Address } from '../../models/address';

export type StepperUpdate = {
  state?: StepperUpdateState,
  data: any
}
export enum StepperUpdateState {
  START = "START",
  NEXT = "NEXT",
  BACK = "BACK",
  COMPLETE = "COMPLETE"
}

@Component({
  selector: 'app-new-user-view',
  templateUrl: './new-user-view.component.html',
  styleUrls: ['./new-user-view.component.css'],
})

export class NewUserViewComponent {

  @ViewChild('stepper') stepper!: MatStepper;

  stepUpdate$: BehaviorSubject<StepperUpdate> = new BehaviorSubject<StepperUpdate>({ state: StepperUpdateState.START, data: undefined });

  userInfo!: User;

  userCredentialGroupCompleted: boolean = false;
  registrationCompleted: boolean = false;

  constructor(private authService: AuthService,
    private userService: UserService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private snackBar: MatSnackBar,
    private routerService: RouterService,
    private idGenerator: IdGeneratorService) {
    this.stepUpdate$.subscribe({
      next: update => {
        switch (update.state) {
          case StepperUpdateState.START:
            break;
          case StepperUpdateState.NEXT:
            this.nextStep(update.data);
            break
          case StepperUpdateState.BACK:
            this.previousStep();
            break;
          case StepperUpdateState.COMPLETE:
            this.completeStepper(update.data);
            break;
        }
      }
    })
  }

  nextStep(formData: any) {
    let step = this.stepper.selected;
    if (step) {
      step.completed = true;
    }
    this.userInfo.setValues(formData);
    this.stepper.next();
  }

  previousStep() {
    this.stepper.previous();
  }

  completeStepper(formData: any) {
    this.userInfo.setValues(formData);
    this.setCustomerDeliveryAddress();

    this.userService.updateUser(this.userInfo).subscribe({
      next: data => {
        this.logger.info(`User information saved successfully: UserId:[${data.userId}] UserType:[${data.userType}]`)
        this.snackBar.open(`Successfully saved user information UserID: [${data.userId}]`,
          'OK',
          { duration: 10000, panelClass: ['mat-toolbar', 'mat-primary'], verticalPosition: "top" });
        this.registrationCompleted = true;
        this.routerService.goToHome();
      },
      error: err => {
        this.logger.error(`Error saving information UserId:[${this.userInfo.userId}]`);
        let response = err as HttpErrorResponse;
        if (response.status == 404) {
          this.logger.error(`Not Found UserID:[${this.userInfo.userId}]`);
          alert(`Unable to save user information!\n
          UserID:${this.userInfo.userId} was not found!\n
          Please try registering again.`)
          window.location.reload();
        }
        else {
          this.restErrorSvc.processPostError(err);
        }
      }
    })
  }

  setUserCredentials(userCredentials: UserCredential) {
    this.userCredentialGroupCompleted = true;
    this.userInfo = new User({
      userId: userCredentials.userId,
      userType: userCredentials.userType
    });

    if (!GlobalConstants.IS_TEST_ENV) {
      this.login(userCredentials);
    }

    this.nextStep(this.userInfo);
  }

  setCustomerDeliveryAddress(){
    if(this.userInfo.userType == UserType.CUSTOMER){
      let deliveryAddress = new Address(this.userInfo.address);
      deliveryAddress.addressId = this.idGenerator.generateId();
      deliveryAddress.isDefault = true;
      console.log(deliveryAddress);
      this.userInfo.deliveryAddresses = [deliveryAddress];
      console.log(this.userInfo);
    }
  }

  login(userCredential: UserCredential) {
    this.authService.login(userCredential);
  }

  canDeactivate(): boolean {
    if (!this.registrationCompleted) {
      let response = confirm("User registration is not complete. Do you still want to leave?")
      return response;
    }
    else {
      return true;
    }
  }
}
