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

  constructor(private httpCLient: HttpClient, private imageCache: ImageCacheService, private sanitizer:DomSanitizer) { 
  }

  getImageSrcString(imageObj: Image): any{
    if(imageObj && imageObj.imageData){
      return this.sanitizer.bypassSecurityTrustResourceUrl(imageObj.imageData);
    }
  }

  saveImage(image: Image): Observable<Image> {
    return this.httpCLient.post<Image>(ImageRestEndpointsService.SAVE_IMAGE, image).pipe(
      tap( image => {
        this.imageCache.addImage(image);
      })
    );
  }

  getImage(imageId: string): Observable<Image> {
    let cachedImg = this.imageCache.getImage(imageId);
    if(cachedImg && cachedImg.isInitialized) {
      const obs = new Observable<Image>( observer => {
        observer.next(cachedImg);
      })

      return obs;
    }

    return this.httpCLient.get<Image>(ImageRestEndpointsService.GET_IMAGE_BY_ID(imageId)).pipe(
      map( image => {
        image.setInitialized();
        return image;
      }),
      tap( image =>{
        this.imageCache.addImage(image);
      })
    );
  }
}
