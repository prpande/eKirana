import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { UserRestEndpointsService } from './user-rest-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getShops(): Observable<Address[]>{
    return this.httpClient.get<Address[]>(UserRestEndpointsService.GET_ALL_SHOPS);
  }
}
