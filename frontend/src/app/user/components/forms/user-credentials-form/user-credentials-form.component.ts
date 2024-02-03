import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { GlobalConstants } from 'src/app/app.module';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { UserCredential } from 'src/app/user/models/userCredential';
import { UserTypeAllowed } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-user-credentials-form',
  templateUrl: './user-credentials-form.component.html',
  styleUrls: ['./user-credentials-form.component.css']
})
export class UserCredentialsFormComponent implements OnInit {
  UserTypes: string[] = Object.values(UserTypeAllowed);

  @Input()
  userCredentials!: UserCredential;

  _isTest = false;
  isUserIdValid: number = -1;
  showPassword: boolean = false;
  done: boolean = false;

  userCredentialGroup!: FormGroup;

  get userId() { return this.userCredentialGroup.get("userId"); }
  get userType() { return this.userCredentialGroup.get("userType"); }
  get password() { return this.userCredentialGroup.get("password"); }
  get confirmPassword() { return this.userCredentialGroup.get("confirmPassword"); }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private logger: LoggerService) { }

  ngOnInit(): void {
    this.userCredentialGroup = this.fb.group({
      userId: ['', [Validators.required,
      Validators.minLength(5),
      this.userIdValidator.bind(this),
      Validators.pattern(/^[A-Za-z0-9]+(?:[@._-][A-Za-z0-9]+)*$/)]],
      userType: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      confirmPassword: ['', [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
    }, { validators: [this.confirmPasswordValidator] });

    if (this.userCredentials) {
      this.userId?.setValue(this.userCredentials.userId);
      this.userType?.setValue(this.userCredentials.userType);
    }

    if(GlobalConstants.IS_TEST_ENV || this._isTest){
      this.password?.clearValidators();
      this.confirmPassword?.clearValidators();
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  forceLower() {
    this.userId?.setValue((this.userId.value as string).toLowerCase());
  }

  confirmPasswordValidator(formGroupControl: AbstractControl) {
    const passwordValue = formGroupControl.get('password')?.value;
    const confirmPasswordValue = formGroupControl.get('confirmPassword')?.value;
    if (!passwordValue || !confirmPasswordValue) {
      return null;
    }
    if (passwordValue != confirmPasswordValue) {
      return { passwordMismatch: true };
    }
    return null;
  }

  userIdValidator() {
    if (this.isUserIdValid === 0) {
      return { userIdConflict: true };
    }

    return null;
  }

  validateUserId() {
    if (!this.done) {
      let userId: string = this.userId?.value;
      if (this.userId?.valid || this.isUserIdValid === 0) {
        this.logger.info(`Checking validity UserId:[${userId}]`);
        this.authService.checkUserId(userId);
        this.authService.userIdValidation$.subscribe({
          next: (data) => {
            if (data == userId) {
              this.isUserIdValid = 1;
              this.userId?.updateValueAndValidity();
            }
          },
          error: err => {
            this.logger.error(`Invalid UserID:[${userId}]`);
            this.isUserIdValid = 0;
            this.userId?.updateValueAndValidity();
          }
        });

        this.isUserIdValid = -1;
      }
    }
  }

  markDone() {
    this.done = true;
    this.userId?.disable();
    this.userType?.disable();
    this.password?.disable();
    this.confirmPassword?.disable();
  }
}
