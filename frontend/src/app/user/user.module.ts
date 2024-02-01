import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { NewUserViewComponent } from './components/new-user-view/new-user-view.component';
import { UserDetailsViewComponent } from './components/user-details-view/user-details-view.component';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { AlertCardComponent } from './components/alert-card/alert-card.component';
import { UserInfoFormComponent } from './components/forms/user-info-form/user-info-form.component';
import { AddressFormComponent } from './components/forms/address-form/address-form.component';
import { IdFormComponent } from './components/forms/id-form/id-form.component';
import { NewUserIdStepComponent } from './components/new-user-view/steps/new-user-id-step/new-user-id-step.component';
import { NewUserAddressStepComponent } from './components/new-user-view/steps/new-user-address-step/new-user-address-step.component';
import { NewUserInfoStepComponent } from './components/new-user-view/steps/new-user-info-step/new-user-info-step.component';
import { VehicleInfoFormComponent } from './components/forms/vehicle-info-form/vehicle-info-form.component';
import { NewUserVehicleInfoStepComponent } from './components/new-user-view/steps/new-user-vehicle-info-step/new-user-vehicle-info-step.component';
import { NewUserCredentialsStepComponent } from './components/new-user-view/steps/new-user-credentials-step/new-user-credentials-step.component';
import { UserCredentialsFormComponent } from './components/forms/user-credentials-form/user-credentials-form.component';



@NgModule({
  declarations: [
    LoginViewComponent,
    DashboardViewComponent,
    NewUserViewComponent,
    UserDetailsViewComponent,
    AddressCardComponent,
    AlertCardComponent,
    UserInfoFormComponent,
    AddressFormComponent,
    IdFormComponent,
    NewUserIdStepComponent,
    NewUserAddressStepComponent,
    NewUserInfoStepComponent,
    VehicleInfoFormComponent,
    NewUserVehicleInfoStepComponent,
    NewUserCredentialsStepComponent,
    UserCredentialsFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginViewComponent,
    DashboardViewComponent,
    NewUserViewComponent,
    UserDetailsViewComponent,
    AddressCardComponent,
    AlertCardComponent
  ]
})
export class UserModule { }
