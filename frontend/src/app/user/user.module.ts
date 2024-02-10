import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { NewUserViewComponent } from './components/new-user-view/new-user-view.component';
import { UserDetailsViewComponent } from './components/user-details-view/user-details-view.component';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { AlertCardComponent } from './components/alert-card/alert-card.component';
import { AddressFormComponent } from './components/forms/address-form/address-form.component';
import { NewUserAddressStepComponent } from './components/new-user-view/steps/new-user-address-step/new-user-address-step.component';
import { NewUserInfoStepComponent } from './components/new-user-view/steps/new-user-info-step/new-user-info-step.component';
import { NewUserVehicleInfoStepComponent } from './components/new-user-view/steps/new-user-vehicle-info-step/new-user-vehicle-info-step.component';
import { NewUserCredentialsStepComponent } from './components/new-user-view/steps/new-user-credentials-step/new-user-credentials-step.component';
import { NewUserIdentificationStepComponent } from './components/new-user-view/steps/new-user-identification-step/new-user-identification-step.component';
import { IdFormComponent } from './components/forms/id-form/id-form.component';
import { UserCredentialsFormComponent } from './components/forms/user-credentials-form/user-credentials-form.component';
import { UserInfoFormComponent } from './components/forms/user-info-form/user-info-form.component';
import { VehicleInfoFormComponent } from './components/forms/vehicle-info-form/vehicle-info-form.component';
import { UserInfoTabComponent } from './components/dashboard-view/user-info-tab/user-info-tab.component';
import { DeliveriesTabComponent } from './components/dashboard-view/deliveries-tab/deliveries-tab.component';
import { LocationTabComponent } from './components/dashboard-view/location-tab/location-tab.component';
import { AlertsTabComponent } from './components/dashboard-view/alerts-tab/alerts-tab.component';
import { InformationControlsComponent } from './components/dashboard-view/information-controls/information-controls.component';
import { DeliveryAddressManagerComponent } from './components/dashboard-view/user-info-tab/delivery-address-manager/delivery-address-manager.component';
import { AddressDialogComponent } from './components/forms/address-dialog/address-dialog.component';
import { DashNavComponent } from './components/dashboard-view/dash-nav/dash-nav.component';



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
    NewUserAddressStepComponent,
    NewUserInfoStepComponent,
    VehicleInfoFormComponent,
    NewUserVehicleInfoStepComponent,
    NewUserCredentialsStepComponent,
    UserCredentialsFormComponent,
    NewUserIdentificationStepComponent,
    UserInfoTabComponent,
    DeliveriesTabComponent,
    LocationTabComponent,
    AlertsTabComponent,
    InformationControlsComponent,
    DeliveryAddressManagerComponent,
    AddressDialogComponent,
    DashNavComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LoginViewComponent,
    DashboardViewComponent,
    NewUserViewComponent,
    UserDetailsViewComponent,
    AddressCardComponent,
    AlertCardComponent,
    DashNavComponent
  ]
})
export class UserModule { }
