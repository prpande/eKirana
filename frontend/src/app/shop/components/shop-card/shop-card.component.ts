import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private imageService: ImageService, private logger: LoggerService){}

  ngOnInit(): void {
    if(this.shop && this.shop.displayImageUrl){
      this.imageService.getImage(this.shop.displayImageUrl).subscribe({
        next: imgData =>{
          if(imgData){
            this.imgSrc = this.imageService.getImageSrcString(imgData);
          }
        },
        error: err =>{
          this.logger.error(err);
        }
      });
    }
  }
}
