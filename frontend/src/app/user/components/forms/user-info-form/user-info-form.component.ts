import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/user/models/user';
import { UserType } from 'src/app/user/models/userType';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css']
})
export class UserInfoFormComponent implements OnInit {

  maxDateOfBirth: Date;

  @Input()
  userSubject$!: BehaviorSubject<User>;
  userInfoGroup!: FormGroup;

  get firstName() { return this.userInfoGroup.get("firstName"); }
  get lastName() { return this.userInfoGroup.get("lastName"); }
  get email() { return this.userInfoGroup.get("email"); }
  get phone() { return this.userInfoGroup.get("phone"); }
  get dateOfBirth() { return this.userInfoGroup.get("dateOfBirth"); }
  get address() { return this.userInfoGroup.get("address"); }
  get panCardNumber() { return this.userInfoGroup.get("panCardNumber"); }
  get gstNumber() { return this.userInfoGroup.get("gstNumber"); }
  get userType() { return this.userInfoGroup.get("userType"); }

  constructor(private fb: FormBuilder) {
    this.maxDateOfBirth = new Date();
    this.maxDateOfBirth.setFullYear(this.maxDateOfBirth.getFullYear() - 18); // Minimum 18yrs old    
  }

  ngOnInit(): void {
    this.userInfoGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[789]\d{9,9}$/)]],
      dateOfBirth: ['', [Validators.required]],
      userType: [''],
      panCardNumber: [''],
      gstNumber: [''],
    });

    this.userSubject$.subscribe({
      next: userInfo => {
        if (userInfo.userId) {
          this.firstName?.setValue(userInfo.firstName);
          this.lastName?.setValue(userInfo.lastName);
          this.email?.setValue(userInfo.email);
          this.phone?.setValue(userInfo.phoneNumber);
          this.userType?.setValue(userInfo.userType);
          this.dateOfBirth?.setValue(userInfo.dateOfBirth);
          this.panCardNumber?.setValue(userInfo.panCardNumber);
          this.gstNumber?.setValue(userInfo.gstIdNumber);

          console.log(userInfo);
          
          if (userInfo?.userType != UserType.CUSTOMER) {
            this.panCardNumber?.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)]);
            this.gstNumber?.setValidators([Validators.required, Validators.minLength(15), Validators.maxLength(15), Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]);
          }
        }
      }
    })

  }
}
