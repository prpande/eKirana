import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { ProductService } from 'src/app/shop/services/product.service';

@Component({
  selector: 'app-checkout-item-card',
  templateUrl: './checkout-item-card.component.html',
  styleUrls: ['./checkout-item-card.component.css']
})
export class CheckoutItemCardComponent implements OnInit {
  @Input()
  cartItem!: CartItem;

  @Input()
  isReadOnly: boolean = false;

  imgSrc!: string;

  constructor(
    private logger: LoggerService,
    private imageService: ImageService) { }

  ngOnInit(): void {
    if (this.cartItem) {
      let product = this.cartItem.item
      if (product && product.imageUrl) {
        this.imageService.getImage(product.imageUrl).subscribe({
          next: imgData => {
            if (imgData) {
              this.imgSrc = this.imageService.getImageSrcString(imgData);
            }
          },
          error: err => {
            this.logger.error(err);
          }
        });
      }
    }
  }

}
