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
    component: LoginViewComponent
  },
  {
    path: "dashboard",
    component: DashboardViewComponent,
    canActivate: [loginGuard],
    resolve: {
      userDataResolver: UserDataResolver
    }
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
