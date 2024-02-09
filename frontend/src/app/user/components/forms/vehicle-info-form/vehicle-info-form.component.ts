import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { User } from 'src/app/user/models/user';
import { Vehicle } from 'src/app/user/models/vehicle';

@Component({
  selector: 'app-vehicle-info-form',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.css']
})
export class VehicleInfoFormComponent implements OnInit {
  @Input()
  userInfo!: User;

  @Input()
  isReadOnly: boolean = true;

  @Input()
  appearance = "fill" as MatFormFieldAppearance;

  vehicleInfoGroup!: FormGroup;
  get registrationNumber() { return this.vehicleInfoGroup.get("registrationNumber"); }
  get drivingLicenseNumber() { return this.vehicleInfoGroup.get("drivingLicenseNumber"); }
  get make() { return this.vehicleInfoGroup.get("make"); }
  get model() { return this.vehicleInfoGroup.get("model"); }
  get vehicleType() { return this.vehicleInfoGroup.get("vehicleType"); }
  get capacity() { return this.vehicleInfoGroup.get("capacity"); }
  get formGroup(): FormGroup { return this.vehicleInfoGroup; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.vehicleInfoGroup = this.fb.group({
      registrationNumber: ['', [Validators.required]],
      drivingLicenseNumber: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      capacity: ['']
    })

    if (this.userInfo?.vehicleInfo) {
      this.registrationNumber?.setValue(this.userInfo.vehicleInfo.registrationNumber);
      this.drivingLicenseNumber?.setValue(this.userInfo.vehicleInfo.drivingLicenseNumber);
      this.make?.setValue(this.userInfo.vehicleInfo.make);
      this.model?.setValue(this.userInfo.vehicleInfo.model);
      this.vehicleType?.setValue(this.userInfo.vehicleInfo.vehicleType);
      this.capacity?.setValue(this.userInfo.vehicleInfo.capacity);
    }
  }

  getVehicleInfoObj(): Vehicle {
    return new Vehicle(this.vehicleInfoGroup.value);
  }
}
