import { Component, Input, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { User } from 'src/app/user/models/user';
import { UserInfoFormComponent } from '../../forms/user-info-form/user-info-form.component';
import { AddressFormComponent } from '../../forms/address-form/address-form.component';
import { IdFormComponent } from '../../forms/id-form/id-form.component';
import { VehicleInfoFormComponent } from '../../forms/vehicle-info-form/vehicle-info-form.component';
import { InformationControlsComponent } from '../information-controls/information-controls.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { UserService } from 'src/app/user/services/user.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { Vehicle } from 'src/app/user/models/vehicle';
import { Address } from 'src/app/user/models/address';

@Component({
  selector: 'app-user-info-tab',
  templateUrl: './user-info-tab.component.html',
  styleUrls: ['./user-info-tab.component.css']
})
export class UserInfoTabComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MatTab) tab!: MatTab;

  @ViewChild(UserInfoFormComponent) userInfoForm!: UserInfoFormComponent;
  @ViewChild(AddressFormComponent) addressInfoForm!: AddressFormComponent;
  @ViewChild(IdFormComponent) idForm!: IdFormComponent;
  @ViewChild(VehicleInfoFormComponent) vehicleInfoForm!: VehicleInfoFormComponent;

  @ViewChild(InformationControlsComponent) controls!: InformationControlsComponent;

  @Input()
  userInfo!: User;

  constructor(private userService: UserService,
    private logger: LoggerService,
    private restErrorSvc: RestErrorHandlerService) { }

  editClick() {
    let form = this.getCurrentTabForm();
    form.isReadOnly = false;
    form.appearance = "fill" as MatFormFieldAppearance
    this.controls.formGroup = form.formGroup;
    this.disableOtherTabs(true);
  }

  cancelClick() {
    let form = this.getCurrentTabForm();
    form.isReadOnly = true;
    form.appearance = "outline" as MatFormFieldAppearance
    form.ngOnInit();
    this.disableOtherTabs(false);
  }

  saveClick(event: any) {
    this.saveNewUserInfo(event);
    this.disableOtherTabs(false);
  }

  disableOtherTabs(disabled: boolean) {
    this.tabGroup._tabs.forEach(tab => {
      if (tab.position != 0) {
        tab.disabled = disabled;
      }
    });

    this.tabGroup.color = disabled ? "accent" : "primary";
  }

  getCurrentTabForm(): any {
    switch (this.tabGroup.selectedIndex) {
      case 0:
        return this.userInfoForm;
      case 1:
        return this.addressInfoForm;
      case 2:
        return this.idForm;
      case 3:
        return this.vehicleInfoForm;
    }

    return undefined;
  }

  saveNewUserInfo(formData: any) {
    let newUserInfo = new User(this.userInfo);
    switch (this.tabGroup.selectedIndex) {
      case 0:
        newUserInfo.setValues(formData);
        break;
      case 1:
        let newAddress = new Address(formData);
        newUserInfo.address = newAddress;
        break;
      case 2:
        newUserInfo.setValues(formData);
        break;
      case 3:
        let vInfo = new Vehicle(formData);
        newUserInfo.vehicleInfo = vInfo;
        break;
    }
    this.userService.updateUser(newUserInfo).subscribe({
      next: user => {
        this.logger.info(`Successfully updated User:[${user.userId}]`);
        this.userInfo = user;
        if(this.tabGroup.selectedIndex == 1){
          this.getCurrentTabForm().address = user.address;
        } else{
          this.getCurrentTabForm().userInfo = user;
        }
        this.getCurrentTabForm().ngOnInit();
      },
      error: err => {
        this.logger.error(`Failed to update User:[${newUserInfo.userId}]`);
        this.restErrorSvc.processPostError(err);
        this.getCurrentTabForm().ngOnInit();
      }
    });
  }

  defaultAppearance() {
    return "outline" as MatFormFieldAppearance;
  }
}