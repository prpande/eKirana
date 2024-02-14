import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/user/models/user';
import { Vehicle } from 'src/app/user/models/vehicle';
import { InteractionDialogService } from '../interaction-dialog/service/interaction-dialog.service';

export interface MapDialogData {
  title: string;
  isDirection: boolean;
  sourceLat: number;
  sourceLng: number;
  destinationLat: number;
  destinationLng: number;
}
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {

  directionsResults!: google.maps.DirectionsResult;
  isDirectionInitialized: boolean = false;
  readonly dirService = new google.maps.DirectionsService();
  readonly dirDisplay = new google.maps.DirectionsRenderer();

  mapZoom = 16;
  mapCenter: google.maps.LatLng = new google.maps.LatLng({ lat: 0, lng: 0 });
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

  locationInitialized: boolean = false;
  locationLatLng: google.maps.LatLng = new google.maps.LatLng({ lat: 0, lng: 0 });
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  constructor(public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: MapDialogData,
    private dialogService: InteractionDialogService) {
  }

  setUpMap() {
    const point: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
    if (this.dialogData.isDirection) {
      point.lat = (this.dialogData.sourceLat + this.dialogData.destinationLat) / 2;
      point.lng = (this.dialogData.sourceLng + this.dialogData.destinationLng) / 2;
      this.mapCenter = new google.maps.LatLng(point);
      this.renderDirections();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          point.lat = position.coords.latitude;
          point.lng = position.coords.longitude;
          this.mapCenter = new google.maps.LatLng(point);
          this.setMapMarker(point);
        }, null, { enableHighAccuracy: true, });
    }
  }

  mapClick(event: any) {
    if (!this.dialogData.isDirection && event.latLng) {
      this.setMapMarker(event.latLng);
    }
  }

  setMapMarker(data: any) {
    console.log(data)
    this.locationLatLng = new google.maps.LatLng(data);
    this.locationInitialized = true;
  }

  renderDirections() {
    console.log(this.dialogData);
    let origin = new google.maps.LatLng({
      lat: this.dialogData.sourceLat,
      lng: this.dialogData.sourceLng
    })
    let destination = new google.maps.LatLng({
      lat: this.dialogData.destinationLat,
      lng: this.dialogData.destinationLng
    })
    this.dirService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        this.displayDirectionsOnMap(response, status);
      });
  }

  displayDirectionsOnMap(response: any, status: any) {
    if (status == google.maps.DirectionsStatus.OK) {
      this.directionsResults = response;
      this.isDirectionInitialized = true;
      this.dirDisplay.setDirections(this.directionsResults);
      this.dirDisplay.setPanel(document.getElementById('directionsList'))
    } else {
      this.dialogService.openInteractionDialog({
        isConfirmation: false,
        title: `Unable to fetch direction data.`,
        message: `Status:[${status}]`
      })

      this.dialogRef.close();
    }
  }

  get areLatLngInvalid(): boolean {
    return this.locationLatLng.lat() == 0 && this.locationLatLng.lng() == 0;
  }

  submitLocation() {
    this.dialogRef.close(new Vehicle(
      {
        latitude: this.locationLatLng.lat(),
        longitude: this.locationLatLng.lng()
      }));
  }
}
