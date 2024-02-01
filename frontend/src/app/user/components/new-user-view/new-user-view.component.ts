import { AfterContentInit, AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserType } from '../../models/userType';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MatStep, MatStepper, StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserCredential } from '../../models/userCredential';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-user-view',
  templateUrl: './new-user-view.component.html',
  styleUrls: ['./new-user-view.component.css'],
})

export class NewUserViewComponent{

  @ViewChild('stepper') stepper!: MatStepper;

  userSubject$: BehaviorSubject<User> = new BehaviorSubject<User>({});
  userInfo: User = {};

  userCredentialGroupCompleted: boolean = false;


  stepperOrientation: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  completeStep(){
    let step = this.stepper.selected;
    if (step) {
      step.completed = true;
    }
    this.stepper.next();
    this.userSubject$.next(this.userInfo);
  }

  setUserCredentials(userCredentials: UserCredential) {
    console.log(userCredentials)
    this.userInfo.userId = userCredentials.userId;
    this.userInfo.userType = userCredentials.userType;
    this.userCredentialGroupCompleted = true;
    console.log(this.userInfo)
    //this.login(userCredentials);   

    this.completeStep();
  }

  login(userCredential: UserCredential) {
    this.authService.login(userCredential);
  }
}
