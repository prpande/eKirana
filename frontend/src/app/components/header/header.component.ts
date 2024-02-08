import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CartService } from 'src/app/cart/services/cart.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { UserCredential } from 'src/app/user/models/userCredential';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  @Input()
  cartDrawer!: MatDrawer;

  title: string;
  loggedIn: boolean = false;
  userCredentials: UserCredential;

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private cartService: CartService) {
    this.title = "e-Kirana";
    this.userCredentials = authService.UserCredentials;
    authService.loggedInStatusStream$.subscribe({
      next: (data) => {
        this.loggedIn = data;
        this.userCredentials = authService.UserCredentials;
      }
    })
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe({
      next: () => {
        if(this.cartService.cartItems.length > 0){
          this.cartDrawer.open();
        }
      }
    })
  }

  toggleCartDrawer() {
    this.cartDrawer.toggle();
  }

  getCartCount() : number{
    return this.cartService.getCount();
  }

  logout() {
    this.loggedIn = false;
    this.userCredentials = this.authService.UserCredentials;
    this.authService.logout();
    this.routerService.goToLogin();
  }
}
