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

const routes: Routes = [
  {
    path: "", 
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home", 
    component: ProductFormComponent
  },
  {
    path: "login", 
    component: LoginViewComponent
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
    path: "shop/:id",
    component: ShopViewComponent
  },
  {
    path: "register",
    component: NewUserViewComponent,
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
