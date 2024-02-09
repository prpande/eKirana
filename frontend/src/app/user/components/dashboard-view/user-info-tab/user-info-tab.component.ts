import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { User } from 'src/app/user/models/user';
import { UserInfoFormComponent } from '../../forms/user-info-form/user-info-form.component';
import { AddressFormComponent } from '../../forms/address-form/address-form.component';
import { IdFormComponent } from '../../forms/id-form/id-form.component';
import { VehicleInfoFormComponent } from '../../forms/vehicle-info-form/vehicle-info-form.component';
import { InformationControlsComponent } from '../information-controls/information-controls.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';

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

  constructor(private cdr: ChangeDetectorRef) { }

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
  saveClick() { }

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

  defaultAppearance() {
    return "outline" as MatFormFieldAppearance;
  }
}