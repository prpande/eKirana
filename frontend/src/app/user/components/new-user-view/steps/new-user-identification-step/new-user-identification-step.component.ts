import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IdFormComponent } from '../../../forms/id-form/id-form.component';
import { User } from 'src/app/user/models/user';
import { BehaviorSubject } from 'rxjs';
import { StepperUpdate, StepperUpdateState } from '../../new-user-view.component';
import { UserType } from 'src/app/user/models/userType';

@Component({
  selector: 'app-new-user-identification-step',
  templateUrl: './new-user-identification-step.component.html',
  styleUrls: ['./new-user-identification-step.component.css']
})
export class NewUserIdentificationStepComponent implements AfterViewInit, OnInit {
  @ViewChild(IdFormComponent) idForm!: IdFormComponent;

  @Input()
  userInfo!: User;

  @Input()
  stepUpdate$!: BehaviorSubject<StepperUpdate>;

  nextButtonText: string = "Next";

  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    if (this.userInfo.userType == UserType.SELLER) {
      this.nextButtonText = "Register";
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();

  }
  onNext() {
    this.userInfo.setValues(this.idForm.userIdGroup.value);
    if (this.userInfo.userType == UserType.SELLER) {
      this.stepUpdate$.next({state: StepperUpdateState.COMPLETE, data: this.userInfo});
    } else {
      this.stepUpdate$.next({state: StepperUpdateState.NEXT, data: this.userInfo});
    }
  }
  onBack() {
    this.stepUpdate$.next({state: StepperUpdateState.BACK, data: undefined});
  }
  checkNextDisabled() {
    return this.idForm && this.idForm.userIdGroup && !this.idForm.userIdGroup.valid
  }
}
