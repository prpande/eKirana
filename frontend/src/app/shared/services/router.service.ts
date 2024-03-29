import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserType } from 'src/app/user/models/userType';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  readonly checkoutStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly dashStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(["home"]);
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }

  goToRegistration() {
    this.router.navigate(["register"]);
  }

  goToUserDash() {
    this.router.navigate(["dashboard"]);
  }

  goToCheckOut() {
    this.router.navigate(["checkout"]);
  }

  goToOrders() {
    this.router.navigate(["orders"]);
  }

  goToSearchResults(searchString: string){
    this.router.navigate(["search", searchString]);
  }
  postLogin(userType: UserType, userId: string) {
    switch (userType) {
      case UserType.SELLER:
        this.router.navigate(["shop", userId]);
        break;
      case UserType.CARRIER:
        this.router.navigate(["delivery-hub"]);
        break;
      default:
        this.goToHome();        
    }
  }
}
