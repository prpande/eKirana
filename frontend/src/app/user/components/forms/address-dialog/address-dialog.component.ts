import { AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { Address } from 'src/app/user/models/address';
import { AddressFormComponent } from '../address-form/address-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AddressDialogData {
  operation: string;
  address: Address
}

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.css']
})
export class AddressDialogComponent implements AfterViewInit{
  @ViewChild(AddressFormComponent) addressForm!: AddressFormComponent;

  constructor(public dialogRef:MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: AddressDialogData,
    private cdr: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

    submitFormData(){
      this.dialogRef.close(new Address(this.addressForm.addressFormGroup.value));
    }

    isSaveDisabled(): boolean{
      return (this.addressForm && (!this.addressForm.addressFormGroup.valid || !this.addressForm.addressFormGroup.dirty))
    }
}
