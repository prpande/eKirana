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
  tableDisplayArray: Order[] = [];
  filteredOrders: Order[] = []

  currentPage: number = 0;
  pageSize: number = 5;
  totalSize: number = 0;

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.authService.goToLoginIfNotLoggedIn();
    this.refreshOrders();
  }

  refreshOrders() {
    this.orderService.getAllOrdersByUser().subscribe({
      next: orderInfos => {
        this.orders = [...orderInfos].reverse();
        this.totalSize = this.orders.length;
        this.filteredOrders= this.orders;
        this.generateOrderArray();
      },
      error: err => {
        this.logger.error(`OrdersTabComponent: Error getting orders for UserId:[${this.authService.UserCredentials?.userId}]`);
        this.restErrorSvc.processFetchError(err);
      }
    })
  }

  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.generateOrderArray();
  }

  generateOrderArray() {
    let start = this.currentPage * this.pageSize;
    let end = start + this.pageSize;
    this.tableDisplayArray = this.filteredOrders.slice(start, end);
    this.totalSize = this.filteredOrders.length;
  }

  get isCustomer(): boolean {
    return this.authService.isCustomer;
  }

  get isSeller(): boolean {
    return this.authService.isSeller;
  }

  applyFilter(target: any) {
    let filter = target.value.trim().toLowerCase();
    this.filteredOrders = this.orders.filter(order =>
      JSON.stringify(order).toLowerCase().includes(filter)
    );
    this.generateOrderArray();
  }
}
