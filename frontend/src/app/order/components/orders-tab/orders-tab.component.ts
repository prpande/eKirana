import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/order/models/order';
import { OrderService } from 'src/app/order/services/order.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { User } from 'src/app/user/models/user';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.css']
})
export class OrdersTabComponent {
  userInfo!: User;

  orders: Order[] = [];

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private actRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.logger.error("No login information found!");
      alert("No user login information found for the session!\nPlease log in again.");
      this.authService.logout();
      this.routerService.goToLogin();
    }

    this.refreshOrders();
  }

  refreshOrders(){
    this.orderService.getAllOrdersByUser().subscribe({
      next: orderInfos => {
        this.orders = [...orderInfos].reverse();
      },
      error: err =>{
        this.logger.error(`OrdersTabComponent: Error getting orders for UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
      }
    })
  }
}
