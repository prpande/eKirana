import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../components/logger/services/logger.service';
import { RestErrorHandlerService } from '../../services/rest-error-handler.service';
import { Image } from '../models/Image';
import { Observable, map, tap } from 'rxjs';
import { ImageRestEndpointsService } from './image-rest-endpoints.service';
import { ImageCacheService } from './image-cache.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpCLient: HttpClient, 
    private imageCache: ImageCacheService, 
    private sanitizer: DomSanitizer,
    private logger: LoggerService) {
  }

  getImageSrcString(imageObj: Image): any {
    if (imageObj && imageObj.imageData) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(imageObj.imageData);
    }
  }

  saveCachedImage(imageId: string) {
    if (imageId) {
      let cachedImg = this.imageCache.getImage(imageId);
      this.saveImage(cachedImg!).subscribe({
        next: imageId => {
          this.logger.info(`Successfully saved cached image in DB:[${imageId}]`);
        },
        error: err => {
          this.logger.error(err);
        }
      });
    }
  }

  saveImage(image: Image): Observable<string> {
    return this.httpCLient.post(ImageRestEndpointsService.SAVE_IMAGE, image, { responseType: 'text' });
  }

  getImage(imageId: string): Observable<Image> {
    let cachedImg = this.imageCache.getImage(imageId);
    if (cachedImg) {
      const obs = new Observable<Image>(observer => {
        observer.next(cachedImg);
      })

      return obs;
    }

    return this.httpCLient.get<Image>(ImageRestEndpointsService.GET_IMAGE_BY_ID(imageId)).pipe(
      tap(image => {
        this.imageCache.addImage(image);
      })
    );
  }

}
