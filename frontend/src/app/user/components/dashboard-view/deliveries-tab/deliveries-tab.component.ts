import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { User } from 'src/app/user/models/user';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-deliveries-tab',
  templateUrl: './deliveries-tab.component.html',
  styleUrls: ['./deliveries-tab.component.css']
})
export class DeliveriesTabComponent {
  userInfo!: User;

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.goToLoginIfNotLoggedIn();

    this.actRoute.data.subscribe({
      next: data => {
        this.userInfo = data['userDataResolver'] as User;
        if (this.userInfo.userType != UserType.CARRIER) {
          this.routerService.goToUserDash();
        }
      },
      error: err => {
        this.logger.error(`DeliveriesTabComponent: Error getting user information UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
        this.authService.logout();
        this.routerService.goToLogin();
      }
    })
  }
}
