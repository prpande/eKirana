import { AfterViewInit, ChangeDetectorRef, Component, Input, Output, ViewChild } from '@angular/core';
import { UserInfoFormComponent } from '../../../forms/user-info-form/user-info-form.component';
import { User } from 'src/app/user/models/user';
import { StepperUpdate, StepperUpdateState } from '../../new-user-view.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-user-info-step',
  templateUrl: './new-user-info-step.component.html',
  styleUrls: ['./new-user-info-step.component.css']
})
export class NewUserInfoStepComponent implements AfterViewInit {
  @ViewChild(UserInfoFormComponent) userInfoForm!: UserInfoFormComponent;
  
  @Input()
  userInfo!: User;

  @Input()
  stepUpdate$!: BehaviorSubject<StepperUpdate>;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  onNext(){
    this.userInfo.setValues(this.userInfoForm.userInfoGroup.value);
    this.stepUpdate$.next({state: StepperUpdateState.NEXT, data: this.userInfo});
  }
  checkNextDisabled(){
    return this.userInfoForm && this.userInfoForm.userInfoGroup && !this.userInfoForm.userInfoGroup.valid
  }
}
