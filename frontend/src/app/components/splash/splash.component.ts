import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/app.module';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { Address } from 'src/app/user/models/address';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  shops: Address[];
  shopImg: Map<string, string> = new Map<string, string>();
  isInitialized: boolean = false;

  constructor(private shopService: UserService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService,
    private imageService: ImageService) {
    this.shops = [];
  }

  ngOnInit(): void {
    this.isInitialized = false;
    if (GlobalConstants.IS_TEST_ENV) {
      return;
    }
    this.shops = [];
    this.shopImg.clear();
    this.shopService.getShops().subscribe({
      next: data => {
        this.shops = data.filter(shop => shop && shop.fullName != undefined);
        this.shops.forEach(shop => {
          this.imageService.getImage(shop.displayImageUrl!).subscribe({
            next: imgData => {
              if (imgData) {
                this.shopImg.set(shop.addressId!, this.imageService.getImageSrcString(imgData));
              }
            },
            error: err => {
              this.logger.error(err);
            }
          })
        });
      },
      error: err => {
        this.restErrorSvc.processFetchError(err);
      }
    })
  }

  getImgSrc(shop: Address): string{
    return this.shopImg.get(shop.addressId!)!;
  }
}
