import { Component } from '@angular/core';
import { RouterService } from 'src/app/shared/services/router.service';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string;
  loggedIn: boolean = false;

  constructor(private routerService: RouterService, private authService: AuthService) {
    this.title = "e-Kirana";
    authService.loggedInStatusStream$.subscribe({
      next: (data) => {
        this.loggedIn = data;
      }
    })
  }

  logout() {
    this.loggedIn = false;
    this.authService.logout();
    this.routerService.goToLogin();
  }
}
