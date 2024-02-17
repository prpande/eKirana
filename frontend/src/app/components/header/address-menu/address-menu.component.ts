import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/user/models/address';
import { UserService } from 'src/app/user/services/user.service';
import { MapInteractionService } from '../../splash/splash-map/map-interaction.service';

@Component({
  selector: 'app-address-menu',
  templateUrl: './address-menu.component.html',
  styleUrls: ['./address-menu.component.css']
})
export class AddressMenuComponent implements OnInit {
  selectedAddress!: Address;
  addressList!: Address[];
  constructor(private userService: UserService,
    private mapInteractionService: MapInteractionService){}

  ngOnInit(): void {
    this.userService.UserUpdate$.subscribe( _ => this.updateAddressList());        
  }

  onAddressSelected(address: Address){
    this.selectedAddress = address;
    this.mapInteractionService.AddressFilter = this.selectedAddress;
  }
  updateAddressList(){
    this.userService.getLoggedInUserInfo().subscribe( info => {
      this.addressList = [...info.deliveryAddresses!];
    })
  }

  getAddressStr(address: Address){
    return `${address.line1},${address.line2},\n
    ${address.city},${address.pinCode}`;
  }
}
