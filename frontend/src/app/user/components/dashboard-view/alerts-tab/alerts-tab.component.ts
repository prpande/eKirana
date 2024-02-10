import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { Alert } from 'src/app/user/models/alert';
import { User } from 'src/app/user/models/user';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-alerts-tab',
  templateUrl: './alerts-tab.component.html',
  styleUrls: ['./alerts-tab.component.css']
})
export class AlertsTabComponent {
  userInfo!: User;
  alerts: Alert[] = [];

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private actRoute: ActivatedRoute,
    private userService: UserService) { }

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
        this.alerts = [...this.userInfo.alertList!].reverse();
      },
      error: err => {
        this.logger.error(`AlertsTabComponent: Error getting user information UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
        this.authService.logout();
        this.routerService.goToLogin();
      }
    })
  }

  refreshAlerts() {
    this.userService.getLoggedInUserInfo().subscribe({
      next: info => {
        this.userInfo = info;
        this.alerts = [...this.userInfo.alertList!].reverse();
      },
      error: err => {
        this.restErrorSvc.processFetchError(err);
      }
    });
  }
}
