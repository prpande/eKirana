import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterService } from 'src/app/shared/services/router.service';
import { UserCredential } from '../../models/userCredential';
import { UserType } from '../../models/userType';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})

export class LoginViewComponent {

  showPassword: boolean;
  loginForm: FormGroup;
  UserTypes: string[];

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: RouterService, private logger: LoggerService) {
    this.showPassword = false;
    this.UserTypes = Object.values(UserType);
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userType: ['', [Validators.required]]
    });
  }

  get userId() { return this.loginForm.get('userId'); }
  get password() { return this.loginForm.get('password'); }
  get userType() { return this.loginForm.get('userType'); }

  onSubmit() {
    let userCredentials: UserCredential = {
      userId: this.userId?.value,
      password: this.password?.value,
      userType: this.userType?.value
    }
    this.authService.login(userCredentials);
    this.authService.userCredential$.subscribe({
      next: () => {
        if(this.authService.isLoggedIn){
        // TODO: Route to user dash
        }
      },
      error: err => {
        this.snackBar.open("Incorrect UserId, Password or UserType Combination!",
        'Try Again',
        { duration: 10000, panelClass: ['mat-toolbar', 'mat-primary'], verticalPosition: "top" })
        this.loginForm.reset();
      }
    })

  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}