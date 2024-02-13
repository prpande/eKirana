import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, timeInterval, timeout } from 'rxjs';
import { InteractionDialogService } from 'src/app/shared/components/interaction-dialog/service/interaction-dialog.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { UserCredential } from 'src/app/user/models/userCredential';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-security-tab',
  templateUrl: './security-tab.component.html',
  styleUrls: ['./security-tab.component.css']
})
export class SecurityTabComponent implements OnInit {

  showPassword: boolean = false;
  userPasswordGroup!: FormGroup;
  displayCredentialsValidError: boolean = false;

  get userId() { return this.userPasswordGroup.get("userId"); }
  get userType() { return this.userPasswordGroup.get("userType"); }
  get oldPassword() { return this.userPasswordGroup.get("oldPassword"); }
  get newPassword() { return this.userPasswordGroup.get("newPassword"); }
  get confirmNewPassword() { return this.userPasswordGroup.get("confirmNewPassword"); }

  constructor(private fb: FormBuilder,
    private restErrorSvc: RestErrorHandlerService,
    private authService: AuthService,
    private logger: LoggerService,
    private userService: UserService,
    private dialogService: InteractionDialogService) { }

  ngOnInit(): void {
    this.authService.goToLoginIfNotLoggedIn();
    this.userPasswordGroup = this.fb.group({
      userId: [''],
      userType: [''],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validators: [this.confirmNewPasswordValidator, this.confirmDifferentPassword] });

    this.userId?.setValue(this.authService.UserCredentials.userId);
    this.userType?.setValue(this.authService.UserCredentials.userType);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  confirmNewPasswordValidator(formGroupControl: AbstractControl) {
    const passwordValue = formGroupControl.get('newPassword')?.value;
    const confirmPasswordValue = formGroupControl.get('confirmNewPassword')?.value;
    if (!passwordValue || !confirmPasswordValue) {
      return null;
    }
    if (passwordValue != confirmPasswordValue) {
      return { passwordMismatch: true };
    }
    return null;
  }

  confirmDifferentPassword(formGroupControl: AbstractControl) {
    const oldPassword = formGroupControl.get('oldPassword')?.value;
    const newPassword = formGroupControl.get('newPassword')?.value;
    if (!oldPassword || !newPassword) {
      return null;
    }
    if (oldPassword == newPassword) {
      return { passwordSame: true };
    }
    return null;
  }

  saveClick() {
    let newCreds = new UserCredential({
      userId: this.userId?.value,
      password: this.oldPassword?.value,
      userType: this.userType?.value
    });

    this.userService.login(newCreds).subscribe({
      next: data => {
        if (data) {
          this.logger.info(`Validated old credentials.`);
          newCreds.password = this.newPassword?.value;
          this.userService.updatePassword(newCreds).subscribe({
            next: creds => {
              if (creds) {
                this.logger.info(`Successfully changed user password: [${this.userId?.value}]`);
                this.dialogService.openInteractionDialog({
                  isConfirmation: false,
                  title: `Password changed successfully.`,
                  message: `Redirecting to login...`
                }).subscribe(() => {
                  this.authService.logout();
                  this.authService.goToLoginIfNotLoggedIn();
                });
              }
            },
            error: err => {
              this.logger.error(`Error changing password for: User:[${this.userId?.value}]`);
              this.restErrorSvc.processPostError(err);
            }
          })
        }
      },
      error: err => {
        this.logger.error(`Error confirming old password for: User:[${this.userId?.value}]`);
        let response = err as HttpErrorResponse;
        if (response.status == 401) {
          this.displayCredentialsValidError = true;
          setTimeout(() => { this.displayCredentialsValidError = false; }, 5000);
          this.ngOnInit()
        }
        else {
          this.restErrorSvc.processPostError(err);
        }
      }
    })
  }
}
