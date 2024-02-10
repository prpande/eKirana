import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { User } from 'src/app/user/models/user';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent {
  userInfo!: User;

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.logger.error("No login information found!");
      alert("No user login information found for the session!\nPlease log in again.");
      this.authService.logout();
      this.routerService.goToLogin();
    }

    this.actRoute.data.subscribe({
      next: data => {
        this.userInfo = data['userDataResolver'] as User;
      },
      error: err => {
        this.logger.error(`DashNavComponent: Error getting user information UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
        this.authService.logout();
        this.routerService.goToLogin();
      }
    })
  }

}
