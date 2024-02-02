import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/user/models/user';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css']
})
export class UserInfoFormComponent implements OnInit {

  maxDateOfBirth: Date;

  @Input()
  userInfo!: User;
  
  userInfoGroup!: FormGroup;

  get firstName() { return this.userInfoGroup.get("firstName"); }
  get lastName() { return this.userInfoGroup.get("lastName"); }
  get email() { return this.userInfoGroup.get("email"); }
  get phone() { return this.userInfoGroup.get("phone"); }
  get dateOfBirth() { return this.userInfoGroup.get("dateOfBirth"); }
  get panCardNumber() { return this.userInfoGroup.get("panCardNumber"); }
  get gstNumber() { return this.userInfoGroup.get("gstNumber"); }
  get userType() { return this.userInfoGroup.get("userType"); }
  get userId() { return this.userInfoGroup.get("userId"); }

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
      userId:['']
    });


    if (this.userInfo.userId) {
      this.firstName?.setValue(this.userInfo.firstName);
      this.lastName?.setValue(this.userInfo.lastName);
      this.email?.setValue(this.userInfo.email);
      this.phone?.setValue(this.userInfo.phoneNumber);
      this.dateOfBirth?.setValue(this.userInfo.dateOfBirth);
      this.userType?.setValue(this.userInfo.userType);
      this.userId?.setValue(this.userInfo.userId);
    }
  }
}
