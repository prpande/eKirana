import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/order/models/order';
import { OrderService } from 'src/app/order/services/order.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-in-progress-deliveries',
  templateUrl: './in-progress-deliveries.component.html',
  styleUrls: ['./in-progress-deliveries.component.css']
})
export class InProgressDeliveriesComponent implements OnInit{

  inProgressDeliveries!: Order[];

  constructor(private logger:LoggerService, 
    private authService: AuthService, 
    private orderService: OrderService){}

  ngOnInit(): void {
    this.inProgressDeliveries = [];
    this.authService.goHomeIfNotAllowed(UserType.CARRIER);
    this.orderService.getAllOrdersByUser().subscribe({
      next: orders => {
        if(orders && orders.length > 0){
          this.inProgressDeliveries = orders.filter(order => this.orderService.isOrderInProgress(order));
          this.logger.info(`Deliveries in progress:[${this.inProgressDeliveries.length}]`)
        }
      },
      error: err=>{
        this.logger.error(err);
      }
    })
  }

  get isDeliveryInProgress(): boolean{
    return this.inProgressDeliveries && this.inProgressDeliveries.length > 0;
  }
}
