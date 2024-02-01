import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { IndiaStatesService } from 'src/app/shared/services/india-states.service';
import { Address } from 'src/app/user/models/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})

export class AddressFormComponent implements OnInit {

  states: string[];

  @Input()
  parentFormGroup!: FormGroup;

  addressFormGroup!: FormGroup;

  get fullName() { return this.addressFormGroup.get("fullName"); }
  get line1() { return this.addressFormGroup.get("line1"); }
  get phoneNumber() { return this.addressFormGroup.get("phoneNumber"); }
  get city() { return this.addressFormGroup.get("city"); }
  get state() { return this.addressFormGroup.get("state"); }
  get pincode() { return this.addressFormGroup.get("pincode"); }
  get latitude() { return this.addressFormGroup.get("latitude"); }
  get longitude() { return this.addressFormGroup.get("longitude"); }

  constructor(private fb: FormBuilder, private idGenerator: IdGeneratorService, private statesService: IndiaStatesService) { 
    this.states = statesService.States;
  }
  
  ngOnInit(): void {
    this.addressFormGroup = this.fb.group({
      addressId: [this.idGenerator.generateId()],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      line1: ['', [Validators.required]],
      line2: [''],
      landmark: [''],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{5}$/)]],
      latitude: [''],
      longitude: [''],
      phoneNumber: ['', [Validators.required]],
      isDefault: [''],
      instructions: [''],
      displayImageUrl: ['']
    });


    if (this.parentFormGroup != undefined) {
      this.parentFormGroup.addControl('address', this.addressFormGroup);
    } else {
      this.parentFormGroup = this.addressFormGroup;
    }
  }
}
