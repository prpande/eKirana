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
  
  mapZoom = 15;
  mapCenter!: google.maps.LatLng;
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
  markerLatLng!: google.maps.LatLng;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  states: string[];

  @Input()
  userInfo!: User;

  addressFormGroup!: FormGroup;

  get fullName() { return this.addressFormGroup.get("fullName"); }
  get line1() { return this.addressFormGroup.get("line1"); }
  get phoneNumber() { return this.addressFormGroup.get("phoneNumber"); }
  get city() { return this.addressFormGroup.get("city"); }
  get state() { return this.addressFormGroup.get("state"); }
  get pinCode() { return this.addressFormGroup.get("pinCode"); }
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
      pinCode: ['', [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{5}$/)]],
      latitude: [''],
      longitude: [''],
      phoneNumber: ['', [Validators.required]],
      isDefault: [''],
      instructions: [''],
      displayImageUrl: ['']
    });
  }

  getAddressObj(): Address {
    return new Address(this.addressFormGroup.value);
  }

  doMapStuff() {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        this.mapCenter = new google.maps.LatLng(point);
        this.setMapMarker(point);
      }, null, { enableHighAccuracy: true, }
      );
    }

    mapClick(event:any){
      if (event.latLng) {
        this.setMapMarker(event.latLng);
      }
    }

    setMapMarker(data:any){
      this.markerLatLng = new google.maps.LatLng(data);
      this.latitude?.setValue(this.markerLatLng.lat());
      this.longitude?.setValue(this.markerLatLng.lng());
      this.markerInitialized = true;
    }
  }
