import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/order/models/order';
import { OrderService } from 'src/app/order/services/order.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-available-deliveries',
  templateUrl: './available-deliveries.component.html',
  styleUrls: ['./available-deliveries.component.css']
})
export class AvailableDeliveriesComponent implements OnInit{
  availableOrders!: Order[];

  constructor(private logger:LoggerService, 
    private authService: AuthService, 
    private orderService: OrderService){}

  ngOnInit(): void {
    this.availableOrders = [];
    this.authService.goHomeIfNotAllowed(UserType.CARRIER);
    this.orderService.getOrdersAvailableForDelivery().subscribe({
      next: orders => {
        if(orders && orders.length > 0){
          this.availableOrders = [...orders];
          this.logger.info(`Orders available for delivery:[${this.availableOrders.length}]`)
        }
      },
      error: err=>{
        this.logger.error(err);
      }
    })
  }

  get isOrderAvailable(): boolean{
    return this.availableOrders && this.availableOrders.length > 0;
  }
}
