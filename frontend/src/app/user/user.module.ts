import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { NewUserViewComponent } from './components/new-user-view/new-user-view.component';
import { UserDetailsViewComponent } from './components/user-details-view/user-details-view.component';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { AlertCardComponent } from './components/alert-card/alert-card.component';



@NgModule({
  declarations: [
    LoginViewComponent,
    DashboardViewComponent,
    NewUserViewComponent,
    UserDetailsViewComponent,
    AddressCardComponent,
    AlertCardComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserModule { }
