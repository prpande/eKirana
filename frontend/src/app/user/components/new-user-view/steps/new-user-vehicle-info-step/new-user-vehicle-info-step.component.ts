import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { VehicleInfoFormComponent } from '../../../forms/vehicle-info-form/vehicle-info-form.component';
import { User } from 'src/app/user/models/user';
import { BehaviorSubject } from 'rxjs';
import { StepperUpdate, StepperUpdateState } from '../../new-user-view.component';
import { Vehicle } from 'src/app/user/models/vehicle';

@Component({
  selector: 'app-new-user-vehicle-info-step',
  templateUrl: './new-user-vehicle-info-step.component.html',
  styleUrls: ['./new-user-vehicle-info-step.component.css']
})
export class NewUserVehicleInfoStepComponent implements AfterViewInit {

  @ViewChild(VehicleInfoFormComponent) userVehicleInfoForm!: VehicleInfoFormComponent;

  @Input()
  userInfo!: User;

  @Input()
  stepUpdate$!: BehaviorSubject<StepperUpdate>;
  
  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  onNext(){
    this.userInfo.vehicleInfo = new Vehicle(this.userVehicleInfoForm.vehicleInfoGroup.value);
    this.stepUpdate$.next({state: StepperUpdateState.COMPLETE, data: this.userInfo});
  }
  onBack(){
    this.stepUpdate$.next({state: StepperUpdateState.START, data: undefined});
  }
  checkNextDisabled(){
    return this.userVehicleInfoForm && this.userVehicleInfoForm.vehicleInfoGroup && !this.userVehicleInfoForm.vehicleInfoGroup.valid
  }
}
