import { Component } from '@angular/core';
import { RouterService } from 'src/app/shared/services/router.service';
import { UserCredential } from 'src/app/user/models/userCredential';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string;
  loggedIn: boolean = false;
  userCredentials: UserCredential;

  constructor(private routerService: RouterService, private authService: AuthService) {
    this.title = "e-Kirana";
    this.userCredentials = authService.UserCredentials;
    authService.loggedInStatusStream$.subscribe({
      next: (data) => {
        this.loggedIn = data;
        this.userCredentials = authService.UserCredentials;
      }
    })
  }

  logout() {
    this.loggedIn = false;
    this.userCredentials = this.authService.UserCredentials;
    this.authService.logout();
    this.routerService.goToLogin();
  }
}
