import { Injectable } from '@angular/core';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {

  private _imageCache: Map<string, Image> = new Map<string, Image>();

  constructor() { }

  addImage(img: Image) {
    if (img && img.imageId) {
      this._imageCache.set(img.imageId, img);
    }
  }

  getImage(imageId: string): Image | undefined {
    return this._imageCache.get(imageId);
  }

  removeImage(imageId: string) {
    this._imageCache.delete(imageId);
  }

  clearCache() {
    this._imageCache.clear();
  }

  addImages(images: Image[]){
    images.forEach(image => {
      this.addImage(image);
    })
  }
}
