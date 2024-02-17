import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from 'src/app/user/models/address';

@Injectable({
  providedIn: 'root'
})
export class MapInteractionService {

  private _addressFilter: BehaviorSubject<Address> = new BehaviorSubject<Address>(new Address());

  private _hoverId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor() { }

  get HoverId(): string{
    return this._hoverId.value;
  }

  get HoverId$(): Observable<string>{
    return this._hoverId.asObservable();
  }

  set HoverId(shopId: string){
    this._hoverId.next(shopId);
  }

  get AddressFilter(): Address{
    return this._addressFilter.value;
  }

  get AddressFilter$(): Observable<Address>{
    return this._addressFilter.asObservable();
  }

  set AddressFilter(address: Address){
    this._addressFilter.next(address);
  }
}
