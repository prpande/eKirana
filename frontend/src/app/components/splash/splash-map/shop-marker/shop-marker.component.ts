import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { Address } from 'src/app/user/models/address';
import { MapInteractionService } from '../map-interaction.service';

@Component({
  selector: 'app-shop-marker',
  templateUrl: './shop-marker.component.html',
  styleUrls: ['./shop-marker.component.css']
})
export class ShopMarkerComponent implements OnInit {
  @Input()
  shop!: Address;

  imgSrc!: string;
  markerClass: string = "";
  markerStyle: string="";
  
  hoverColorVar!: string;
  constructor(private imageService: ImageService,
    private mapInteractionService: MapInteractionService) {
  }

  ngOnInit(): void {
    this.mapInteractionService.HoverId$.subscribe(_ => this.onHoverIndexChange());
    this.imageService.getImage(this.shop.displayImageUrl!).subscribe(img => {
      this.imgSrc = this.imageService.getImageSrcString(img);
    })

  }

  get hoverIndex(): string {
    return this.mapInteractionService.HoverId;
  }

  onZoomChange() {

  }

  get shopName(): string[]{
    return this.shop.fullName?.split(' ')!;
  }

  onHoverIndexChange() { 
    if(this.shop.addressId == this.mapInteractionService.HoverId){
      this.hoverColorVar = "#3f51b5a2";
    }else{
      this.hoverColorVar = "";
    }
  }
}
