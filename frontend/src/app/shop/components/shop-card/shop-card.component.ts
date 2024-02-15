import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { elementAt } from 'rxjs';
import { MapInteractionService } from 'src/app/components/splash/splash-map/map-interaction.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { Address } from 'src/app/user/models/address';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent implements OnInit {

  @Input()
  shop?: Address;
  imgSrc!: string;
  card!: HTMLElement;
  isInitialized = false;

  constructor(private imageService: ImageService, private logger: LoggerService,
    private mapInteractionService: MapInteractionService){
      mapInteractionService.HoverId$.subscribe(() => { this.onHover()})
    }

  ngOnInit(): void {
    if(this.shop && this.shop.displayImageUrl){
      this.imageService.getImage(this.shop.displayImageUrl).subscribe({
        next: imgData =>{
          if(imgData){
            this.imgSrc = this.imageService.getImageSrcString(imgData);
            this.isInitialized = true;
          }
        },
        error: err =>{
          this.logger.error(err);
          this.isInitialized = true;
        }
      });
    }

  }

  mouseOverInfo(){
    this.mapInteractionService.HoverId = this.shop?.addressId!;
  }

  onHover(){
    let element = document.getElementById(this.shop?.addressId!);
    if(this.mapInteractionService.HoverId == this.shop?.addressId!){
      element?.classList.add("card-hover");
      console.log(element);
    } else {
      element?.classList.remove("card-hover");
    }
  }
  onLoad(card:any){
    this.card = card;
  }
}
