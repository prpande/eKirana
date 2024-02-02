import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { UserRestEndpointsService } from './user-rest-endpoints.service';
import { UserCredential } from '../models/userCredential';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getShops(): Observable<Address[]>{
    return this.httpClient.get<Address[]>(UserRestEndpointsService.GET_ALL_SHOPS);
  }

  createUserCredentials(userCredentials: UserCredential): Observable<UserCredential>{
    return this.httpClient.post<UserCredential>(UserRestEndpointsService.SAVE_CREDENTIALS, userCredentials);
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(UserRestEndpointsService.UPDATE_USER, user);
  }
}
