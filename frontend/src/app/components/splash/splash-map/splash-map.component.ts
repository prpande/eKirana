import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Address } from 'src/app/user/models/address';
import { MapInteractionService } from './map-interaction.service';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';

@Component({
  selector: 'app-splash-map',
  templateUrl: './splash-map.component.html',
  styleUrls: ['./splash-map.component.css']
})
export class SplashMapComponent {
  @ViewChild(GoogleMap) gMap!: GoogleMap;
  @ViewChildren(MapInfoWindow) infoWindowsView!: QueryList<MapInfoWindow>;

  @Input()
  shops!: Address[];

  hoverShop!: Address;
  hoverImg!: string;
  
  mapZoom = 16;
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

  markersInitialized: boolean = false;
  markers: Map<google.maps.LatLng, Address> = new Map<google.maps.LatLng, Address>();
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    clickable: true
  };

  constructor(private imageService: ImageService,
    private mapInteractionService: MapInteractionService) {
    mapInteractionService.HoverId$.subscribe(_ => this.onHoverIndexChange());
  }

  initMarkers() {
    this.markers.clear();
    this.shops.forEach(shop => {
      let marker = new google.maps.LatLng({
        lat: shop.latitude!,
        lng: shop.longitude!
      });
      this.markers.set(marker, shop);
    })
    this.markersInitialized = true;
    this.setUpMap();
  }

  setUpMap() {
    const point: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        point.lat = position.coords.latitude;
        point.lng = position.coords.longitude;
        this.mapCenter = new google.maps.LatLng(point);
        this.initializeInfoWindows();

      }, null, { enableHighAccuracy: true, });
  }

  initializeInfoWindows() {
    this.infoWindowsView.forEach(window => {
      window.options = { disableAutoPan: true };
      window.open(undefined, false);
    })
  }

  onCLose() { }
  get Markers() {
    return [...this.markers.keys()];
  }

  mouseOverInfo(shopId: string) {
    this.mapInteractionService.HoverId = shopId;
  }

  get hoverId(): string {
    return this.mapInteractionService.HoverId;
  }

  getShop(marker: any): Address {
    return this.markers.get(marker)!;
  }

  onHoverIndexChange() {
    if (this.hoverId) {
      let index = 0;
      this.infoWindowsView.forEach(window => {
        let shop = this.getShop(this.Markers.at(index));
        if (shop.addressId == this.hoverId) {
          this.imageService.getImage(shop.displayImageUrl!).subscribe(img => {
            this.hoverImg = this.imageService.getImageSrcString(img);
            this.hoverShop = shop;
            // window.options = { disableAutoPan: false };
            // window.open(undefined, false);
            window.infoWindow?.setZIndex(100);
            let shopLatLng = new google.maps.LatLng({
              lat: shop.latitude!,
              lng: shop.longitude!
            });
            this.gMap.panTo(shopLatLng);
          })
        } else {
          window.infoWindow?.setZIndex(5);
        }
        index++;
      })
    }
  }
}
