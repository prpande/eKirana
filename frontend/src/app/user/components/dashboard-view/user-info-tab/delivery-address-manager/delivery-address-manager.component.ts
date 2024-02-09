import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { Address } from 'src/app/user/models/address';
import { UserService } from 'src/app/user/services/user.service';
import { AddressDialogComponent } from '../../../forms/address-dialog/address-dialog.component';

@Component({
  selector: 'app-delivery-address-manager',
  templateUrl: './delivery-address-manager.component.html',
  styleUrls: ['./delivery-address-manager.component.css']
})
export class DeliveryAddressManagerComponent implements OnInit {

  addresses: Address[] = [];

  constructor(private userService: UserService, 
    private restErrorSvc: RestErrorHandlerService, 
    private logger: LoggerService,
    private addressDialog: MatDialog) { }

  ngOnInit(): void {
    this.addresses = [];
    this.userService.getLoggedInUserInfo().subscribe({
      next: info => {
        if (info && info.userId) {
          if (info.deliveryAddresses?.length) {
            this.addresses.push(...info.deliveryAddresses!);
          }
        }
      },
      error: err => {
        this.handleRestError(err);
      }
    })
  }

  handleRestError(data: any) {
    this.logger.error(data);
    this.restErrorSvc.processFetchError(data);
  }

  addNewAddress(){
    const dialogRef = this.addressDialog.open(AddressDialogComponent, {
      data: {
        operation: "Add"
      }
    });

    dialogRef.afterClosed().subscribe(addressInfo => {
      if(addressInfo){
        this.userService.addUserDeliveryAddress(addressInfo).subscribe({
          next: savedUser => {
            this.logger.info(`Saved Address:[${addressInfo.addressId}]`);
            this.addresses = [...savedUser.deliveryAddresses!];
          },
          error: err =>{
            this.restErrorSvc.processPostError(err);
          }
        })
      }
    })
  }

  onAddressModified(){
    this.ngOnInit();
  }
}
