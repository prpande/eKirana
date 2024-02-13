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
  displayArray: Alert[] = [];
  filteredAlerts: Alert[] = []

  currentPage: number = 0;
  pageSize: number = 10;
  totalSize: number = 0;

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.authService.goToLoginIfNotLoggedIn();
    this.refreshAlerts();
  }

  refreshAlerts() {
    this.userService.getLoggedInUserInfo().subscribe({
      next: info => {
        this.userInfo = info;
        this.alerts = [...this.userInfo.alertList!].reverse();
        this.totalSize = this.alerts.length;
        this.filteredAlerts = this.alerts;
        this.generateAlertArray();
      },
      error: err => {
        this.logger.error(`AlertsTabComponent: Error getting alerts for UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
      }
    });
  }

  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.generateAlertArray();
  }

  generateAlertArray() {
    let start = this.currentPage * this.pageSize;
    let end = start + this.pageSize;
    this.displayArray = this.filteredAlerts.slice(start, end);
    this.totalSize = this.filteredAlerts.length;
  }

  applyFilter(target: any) {
    let filter = target.value.trim().toLowerCase();
    this.filteredAlerts = this.alerts.filter(alert =>
      JSON.stringify(alert).toLowerCase().includes(filter)
    );
    this.generateAlertArray();
  }
}
