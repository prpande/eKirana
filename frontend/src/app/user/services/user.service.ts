import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Address } from '../models/address';
import { UserRestEndpointsService } from './user-rest-endpoints.service';
import { UserCredential } from '../models/userCredential';
import { User } from '../models/user';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private imageService: ImageService) { }

  getShops(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(UserRestEndpointsService.GET_ALL_SHOPS).pipe(
      tap((addresses)=>{
        addresses.forEach(address =>{
          this.imageService.getImage(address.displayImageUrl!);
        })
      })
    );
  }

  createUserCredentials(userCredentials: UserCredential): Observable<UserCredential> {
    return this.httpClient.post<UserCredential>(UserRestEndpointsService.SAVE_CREDENTIALS, userCredentials);
  }

  updateUser(user: User): Observable<User> {
    if(user.address?.displayImageUrl){
      this.imageService.saveCachedImage(user.address?.displayImageUrl);
    }
    return this.httpClient.put<User>(UserRestEndpointsService.UPDATE_USER, user);
  }

  getLoggedInUserInfo(): Observable<User> {
    return this.httpClient.get<User>(UserRestEndpointsService.GET_USER_BY_ID);
  }

  getOtherUserInfo(userId: string): Observable<User> {
    return this.httpClient.get<User>(UserRestEndpointsService.GET_ANOTHER_USER_BY_ID + `/${userId}`);
  }

  addUserDeliveryAddress(address: Address): Observable<User> {
    return this.httpClient.post<User>(UserRestEndpointsService.ADD_USER_ADDRESS, address);
  }

  updateUserDeliveryAddress(address: Address): Observable<User> {
    return this.httpClient.put<User>(UserRestEndpointsService.UPDATE_USER_ADDRESS, address);
  }

  deleteUserDeliveryAddress(addressId: string): Observable<boolean>{
    return this.httpClient.delete<boolean>(UserRestEndpointsService.DELETE_USER_ADDRESS(addressId));
  }
}
