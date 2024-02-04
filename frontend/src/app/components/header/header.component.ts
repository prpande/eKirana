import { Component } from '@angular/core';
import { RouterService } from 'src/app/shared/services/router.service';
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
  userType: UserType = UserType.PUBLIC;

  constructor(private routerService: RouterService, private authService: AuthService) {
    this.title = "e-Kirana";
    authService.loggedInStatusStream$.subscribe({
      next: (data) => {
        this.loggedIn = data;
        this.userType = authService.UserCredentials?.userType!;
      }
    })
  }

  logout() {
    this.loggedIn = false;
    this.userType = UserType.PUBLIC;
    this.authService.logout();
    this.routerService.goToLogin();
  }
}
