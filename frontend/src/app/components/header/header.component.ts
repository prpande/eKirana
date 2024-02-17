import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CartService } from 'src/app/cart/services/cart.service';
import { OrderService } from 'src/app/order/services/order.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { UserCredential } from 'src/app/user/models/userCredential';
import { AuthService } from 'src/app/user/services/auth.service';
import { Observable, count, debounceTime, map, reduce, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  cartDrawer!: MatDrawer;

  @Input()
  dashDrawer!: MatDrawer;

  title: string;
  loggedIn: boolean = false;
  userCredentials: UserCredential;
  canOpenCartDrawer: boolean = true;


  constructor(private routerService: RouterService,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService) {
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
        if (this.cartService.cartItems.length > 0) {
          if (this.canOpenCartDrawer) {
            this.cartDrawer.open();
          }
        }
      }
    })

    this.routerService.checkoutStarted.subscribe(() => {
      this.canOpenCartDrawer = !this.routerService.checkoutStarted.value;
      if (!this.canOpenCartDrawer) {
        this.cartDrawer.close();
      }
    })

    this.routerService.dashStarted.subscribe(() => {
      this.routerService.dashStarted.value ? this.dashDrawer.open() : this.dashDrawer.close();
    });
  }

  toggleCartDrawer() {
    this.cartDrawer.toggle();
  }

  getCartCount(): number {
    return this.cartService.getCount();
  }

  logout() {
    this.loggedIn = false;
    this.userCredentials = this.authService.UserCredentials;
    this.authService.logout();
    this.routerService.goToLogin();
  }


  get ordersNeedingAttentionCount(): Observable<number> {
    return this.orderService.getOrdersNeedingAttention().pipe(
      tap(a => console.log(a)),
      reduce(
        (count, _) => { return ++count; }
        , 0),
        debounceTime(10000),
        tap(
          count => console.log(count)
        ));
  }
} 
