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
import { UserInfoTabComponent } from './user/components/dashboard-view/user-info-tab/user-info-tab.component';
import { AlertsTabComponent } from './user/components/dashboard-view/alerts-tab/alerts-tab.component';
import { DeliveriesTabComponent } from './user/components/dashboard-view/deliveries-tab/deliveries-tab.component';
import { LocationTabComponent } from './user/components/dashboard-view/location-tab/location-tab.component';
import { OrdersTabComponent } from './user/components/dashboard-view/orders-tab/orders-tab.component';
import { ProductFormComponent } from './shop/components/product-form/product-form.component';
import { EditProductDialogComponent } from './shop/components/edit-product-dialog/edit-product-dialog.component';
import { ProductCardComponent } from './shop/components/product-card/product-card.component';
import { preventRegistrationGuard } from './shared/guards/prevent-registration.guard';
import { CheckoutComponent } from './order/components/checkout/checkout.component';
import { checkoutBeginGuard } from './shared/guards/checkout-begin.guard';
import { checkoutEndGuard } from './shared/guards/checkout-end.guard';

const routes: Routes = [
  {
    path: "", 
    redirectTo: "/home",
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
    path: "dashboard",
    component: DashboardViewComponent,
    canActivate: [loginGuard],
    resolve: {
      userDataResolver: UserDataResolver
    },
    children: [{
      path: "dashboard/information",
      component: UserInfoTabComponent,
      outlet: "dash-content"
    },
    {
      path: "dashboard/alerts",
      component: AlertsTabComponent,
      outlet: "dash-content"
    },
    {
      path: "dashboard/deliveries",
      component: DeliveriesTabComponent,
      outlet: "dash-content"
    },
    {
      path: "dashboard/location",
      component: LocationTabComponent,
      outlet: "dash-content"
    },
    {
      path: "dashboard/orders",
      component: OrdersTabComponent,
      outlet: "dash-content"
    }]
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
