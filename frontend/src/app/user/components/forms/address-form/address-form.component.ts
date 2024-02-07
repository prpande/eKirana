import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';
import { IndiaStatesService } from 'src/app/shared/services/india-states.service';
import { Address } from 'src/app/user/models/address';
import { User } from 'src/app/user/models/user';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})

export class AddressFormComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  mapZoom = 16;
  mapCenter: google.maps.LatLng = new google.maps.LatLng({lat:0,lng:0});
  mapOptions: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    clickableIcons: false,
    disableDefaultUI: true,
    fullscreenControl: false,
    keyboardShortcuts: false,
    mapTypeControl: false,
    streetViewControl: false
  };

  markerInitialized: boolean = false;
  markerLatLng: google.maps.LatLng= new google.maps.LatLng({lat:0,lng:0});
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  states: string[];

  @Input()
  address!: Address;

  dataInitialized: boolean = false;

  addressFormGroup!: FormGroup;

  get addressId() { return this.addressFormGroup.get("addressId"); }
  get fullName() { return this.addressFormGroup.get("fullName"); }
  get line1() { return this.addressFormGroup.get("line1"); }
  get line2() { return this.addressFormGroup.get("line2"); }
  get landmark() { return this.addressFormGroup.get("landmark"); }
  get city() { return this.addressFormGroup.get("city"); }
  get state() { return this.addressFormGroup.get("state"); }
  get pinCode() { return this.addressFormGroup.get("pinCode"); }
  get latitude() { return this.addressFormGroup.get("latitude"); }
  get longitude() { return this.addressFormGroup.get("longitude"); }
  get phoneNumber() { return this.addressFormGroup.get("phoneNumber"); }
  get isDefault() { return this.addressFormGroup.get("isDefault"); }
  get instructions() { return this.addressFormGroup.get("instructions"); }
  get displayImageUrl() { return this.addressFormGroup.get("displayImageUrl"); }

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
      pinCode: ['', [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{5}$/)]],
      latitude: [''],
      longitude: [''],
      phoneNumber: ['', [Validators.required]],
      isDefault: [''],
      instructions: [''],
      displayImageUrl: ['']
    });

    if (this.address && this.address.addressId) {
      this.addressId?.setValue(this.address.addressId);
      this.fullName?.setValue(this.address.fullName);
      this.line1?.setValue(this.address.line1);
      this.line2?.setValue(this.address.line2);
      this.landmark?.setValue(this.address.landmark);
      this.city?.setValue(this.address.city);
      this.state?.setValue(this.address.state);
      this.pinCode?.setValue(this.address.pinCode);
      this.latitude?.setValue(this.address.latitude);
      this.longitude?.setValue(this.address.longitude);
      this.phoneNumber?.setValue(this.address.phoneNumber);
      this.isDefault?.setValue(this.address.isDefault);
      this.instructions?.setValue(this.address.instructions);
      this.displayImageUrl?.setValue(this.address.displayImageUrl);
    }
    this.dataInitialized = true;
  }

  getAddressObj(): Address {
    return new Address(this.addressFormGroup.value);
  }

  setUpMap() {
    const point: google.maps.LatLngLiteral = { lat:0, lng:0};
    if (this.address && this.address.addressId) {
      point.lat = this.address!.latitude!;
      point.lng = this.address!.longitude!;
      this.mapCenter = new google.maps.LatLng(point);
      this.setMapMarker(point);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          point.lat = position.coords.latitude;
          point.lng =  position.coords.longitude;
          this.mapCenter = new google.maps.LatLng(point);
          this.setMapMarker(point);
        }, null, { enableHighAccuracy: true, }
        );
      }

    }


  mapClick(event: any) {
    if (event.latLng) {
      this.setMapMarker(event.latLng);
    }
  }

  setMapMarker(data: any) {
    this.markerLatLng = new google.maps.LatLng(data);
    this.latitude?.setValue(this.markerLatLng.lat());
    this.longitude?.setValue(this.markerLatLng.lng());
    this.markerInitialized = true;
  }
}
