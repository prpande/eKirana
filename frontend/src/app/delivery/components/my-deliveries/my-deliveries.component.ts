import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/order/models/order';
import { OrderService } from 'src/app/order/services/order.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-my-deliveries',
  templateUrl: './my-deliveries.component.html',
  styleUrls: ['./my-deliveries.component.css']
})
export class MyDeliveriesComponent implements OnInit {
  myDeliveries!: Order[];

  constructor(private logger: LoggerService,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.myDeliveries = [];
    this.authService.goHomeIfNotAllowed(UserType.CARRIER);
    this.orderService.getAllOrdersByUser().subscribe({
      next: orders => {
        if (orders && orders.length > 0) {
          this.myDeliveries = orders;
        }
      },
      error: err => {
        this.logger.error(err);
      }
    })
  }

  get isMyDeliveries(): boolean {
    return this.myDeliveries && this.myDeliveries.length > 0;
  }
}
