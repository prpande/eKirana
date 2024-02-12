import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../models/address';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { AddressDialogComponent } from '../forms/address-dialog/address-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent {
  @Input()
  address!: Address;

  @Output()
  addressUpdatedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private addressDialog: MatDialog,
    private logger: LoggerService,
    private restErrorSvc: RestErrorHandlerService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.address = new Address();
  }

  isLine2(): boolean {
    if (this.address.line2?.trim().length! > 0) {
      return true;
    }

    return false;
  }
  isLandmark(): boolean {
    if (this.address.landmark?.trim().length! > 0) {
      return true;
    }

    return false;
  }

  editAddress() { 
    const dialogRef = this.addressDialog.open(AddressDialogComponent, {
      data: {
        operation: "Edit",
        address: this.address
      }
    });

    dialogRef.afterClosed().subscribe(addressInfo =>{
      if(addressInfo){
        this.userService.updateUserDeliveryAddress(addressInfo).subscribe({
          next: savedAddress => {
            this.logger.info(`Updated Address:[${addressInfo.addressId}]`);
            this.addressUpdatedEvent.emit(addressInfo.addressId);
          },
          error: err =>{
            this.restErrorSvc.processPostError(err);
          }
        })
      }
    })
  }

  deleteAddress() { 
    this.userService.deleteUserDeliveryAddress(this.address.addressId!).subscribe({
      next: data => {
        console.log(`Address delete successfully:[${this.address.addressId}]`);
        this.addressUpdatedEvent.emit(undefined);
      },
      error: err => {
        this.restErrorSvc.processPostError(err);
      }
    })
  }

  get isUserOwner(): boolean{
    return this.authService.UserCredentials.userId == this.address.userId;
  }
}
