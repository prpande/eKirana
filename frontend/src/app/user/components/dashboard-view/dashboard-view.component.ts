import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { RouterService } from 'src/app/shared/services/router.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  userInfo!: User;

  initialized: boolean = false;
  tabIndex: number = 0;

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
      },
      error: err => {
        this.logger.error(`DashboardViewComponent: Error getting user information UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
        this.authService.logout();
        this.routerService.goToLogin();
      }
    })

    this.actRoute.paramMap.subscribe(params => {
      this.tabIndex = Number.parseInt(params.get('tabIndex') ?? '0');
      this.initialized = true;
    })

  }

}
