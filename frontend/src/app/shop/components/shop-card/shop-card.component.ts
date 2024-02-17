import { Component, Input } from '@angular/core';
import { MapInteractionService } from 'src/app/components/splash/splash-map/map-interaction.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { Address } from 'src/app/user/models/address';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent {

  @Input()
  shop?: Address;
  @Input()
  imgSrc!: string;

  card!: HTMLElement;

  constructor(private mapInteractionService: MapInteractionService){
      mapInteractionService.HoverId$.subscribe(() => { this.onHover()})
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
