import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { LoginViewComponent } from './user/components/login-view/login-view.component';
import { DashboardViewComponent } from './user/components/dashboard-view/dashboard-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { loginGuard } from './shared/guards/login.guard';
import { NewUserViewComponent } from './user/components/new-user-view/new-user-view.component';
import { ShopViewComponent } from './shop/components/shop-view/shop-view.component';
import { preventNavigationGuard } from './shared/guards/prevent-navigation.guard';
import { UserDataResolver } from './user/components/dashboard-view/user-data-resolver';
import { AlertsTabComponent } from './user/components/dashboard-view/alerts-tab/alerts-tab.component';
import { DeliveriesTabComponent } from './user/components/dashboard-view/deliveries-tab/deliveries-tab.component';
import { LocationTabComponent } from './user/components/dashboard-view/location-tab/location-tab.component';
import { OrdersTabComponent } from './order/components/orders-tab/orders-tab.component';
import { preventRegistrationGuard } from './shared/guards/prevent-registration.guard';
import { CheckoutComponent } from './order/components/checkout/checkout.component';
import { checkoutBeginGuard } from './shared/guards/checkout-begin.guard';
import { checkoutEndGuard } from './shared/guards/checkout-end.guard';
import { dashStartGuard } from './shared/guards/dash-start.guard';
import { dashEndGuard } from './shared/guards/dash-end.guard';
import { OrderPageComponent } from './order/components/order-page/order-page.component';
import { SecurityTabComponent } from './user/components/dashboard-view/security-tab/security-tab.component';
import { DeliveryHubViewComponent } from './delivery/components/delivery-hub-view/delivery-hub-view.component';

const routes: Routes = [
  {
    path: "", 
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "dashboard", 
    redirectTo: "/information/0",
    pathMatch: "full"
  },
  {
    path: "home", 
    component: SplashComponent
  },
  {
    path: "login", 
    component: LoginViewComponent,
    canActivate: [preventRegistrationGuard]
  },
  {
    path: "information/:tabIndex",
    component: DashboardViewComponent,
    canActivate: [loginGuard, dashStartGuard],
    canDeactivate: [dashEndGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
  },
  {
    path: "alerts",
    component: AlertsTabComponent,
    canActivate: [loginGuard, dashStartGuard],
    canDeactivate: [dashEndGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
  },
  {
    path: "delivery-hub",
    component: DeliveryHubViewComponent,
    canActivate: [loginGuard],
  },
  {
    path: "location",
    component: LocationTabComponent,
    canActivate: [loginGuard, dashStartGuard],
    canDeactivate: [dashEndGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
  },
  {
    path: "orders",
    component: OrdersTabComponent,
    canActivate: [loginGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
  },
  {
    path: "security",
    component: SecurityTabComponent,
    canActivate: [loginGuard, dashStartGuard],
    canDeactivate: [dashEndGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
  },
  {
    path: "orders/:orderId",
    component: OrderPageComponent,
    canActivate: [loginGuard]
  },
  {
    path: "shop/:shopId",
    component: ShopViewComponent,
    canActivate: [loginGuard]
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [loginGuard, checkoutBeginGuard],
    canDeactivate: [checkoutEndGuard]
  },
  {
    path: "register",
    component: NewUserViewComponent,
    canActivate: [preventRegistrationGuard],
    canDeactivate: [preventNavigationGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
