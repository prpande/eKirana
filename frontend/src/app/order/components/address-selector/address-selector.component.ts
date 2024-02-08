import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { Address } from 'src/app/user/models/address';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent implements OnInit {

  addresses: Address[] = [];
  addressSelector: FormControl = new FormControl('');

  constructor(private userService: UserService, private restErrorSvc: RestErrorHandlerService, private logger: LoggerService) { }
  ngOnInit(): void {
    this.userService.getLoggedInUserInfo().subscribe({
      next: info => {
        if (info && info.userId) {
          this.addresses.push(info.address!);
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

  getSelectedAddress(): Address{
    let foundAddress = this.addresses.find(address => address.addressId == this.addressSelector.value);
    if(foundAddress)
    {
      return foundAddress;
    }

    return new Address();
  }
}
