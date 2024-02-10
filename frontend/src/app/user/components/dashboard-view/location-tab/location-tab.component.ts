import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { User } from 'src/app/user/models/user';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.css']
})
export class LocationTabComponent {
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
        if (this.userInfo.userType != UserType.CARRIER) {
          this.routerService.goToUserDash();
        }
      },
      error: err => {
        this.logger.error(`LocationTabComponent: Error getting user information UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
        this.authService.logout();
        this.routerService.goToLogin();
      }
    })
  }
}
