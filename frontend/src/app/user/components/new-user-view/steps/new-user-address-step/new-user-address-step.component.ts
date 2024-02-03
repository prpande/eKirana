import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddressFormComponent } from '../../../forms/address-form/address-form.component';
import { User } from 'src/app/user/models/user';
import { BehaviorSubject } from 'rxjs';
import { StepperUpdate, StepperUpdateState } from '../../new-user-view.component';
import { UserType } from 'src/app/user/models/userType';
import { Address } from 'src/app/user/models/address';

@Component({
  selector: 'app-new-user-address-step',
  templateUrl: './new-user-address-step.component.html',
  styleUrls: ['./new-user-address-step.component.css']
})
export class NewUserAddressStepComponent implements OnInit, AfterViewInit {
  @ViewChild(AddressFormComponent) userAddressForm!: AddressFormComponent;

  @Input()
  userInfo!: User;

  @Input()
  stepUpdate$!: BehaviorSubject<StepperUpdate>;

  nextButtonText: string = "Next";

  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    if (this.userInfo.userType == UserType.CUSTOMER) {
      this.nextButtonText = "Register";
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  onNext() {
    this.userInfo.address = new Address(this.userAddressForm.addressFormGroup.value);
    if (this.userInfo.userType == UserType.CUSTOMER) {
      this.stepUpdate$.next({state: StepperUpdateState.COMPLETE, data: this.userInfo});
    } else {
      this.stepUpdate$.next({state: StepperUpdateState.NEXT, data: this.userInfo});
    }
  }
  onBack() {
    this.stepUpdate$.next({state: StepperUpdateState.START, data: undefined});
  }
  checkNextDisabled() {
    return this.userAddressForm && this.userAddressForm.addressFormGroup && !this.userAddressForm.addressFormGroup.valid
  }
}