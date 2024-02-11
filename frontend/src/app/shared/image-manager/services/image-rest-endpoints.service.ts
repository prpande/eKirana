import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageRestEndpointsService {

  public static readonly IMAGE_SERVICE_URL: string = "http://localhost:8085";
  public static readonly IMAGE_ROOT: string = ImageRestEndpointsService.IMAGE_SERVICE_URL + "/api/image";
  public static readonly SAVE_IMAGE: string = ImageRestEndpointsService.IMAGE_ROOT + "/";
  public static readonly IMAGE_SECURE_PATTERNS: string[] = [ImageRestEndpointsService.IMAGE_ROOT + "/*"];

  static GET_IMAGE_BY_ID(imageId: string): string {
    return `${ImageRestEndpointsService.IMAGE_ROOT}/${imageId}`;
  }

  static GET_IMAGE_BY_USER_ID(imageId: string): string {
    return `${ImageRestEndpointsService.IMAGE_ROOT}/user/${imageId}`;
  }

  static DELETE_IMAGE(imageId: string): string {
    return `${ImageRestEndpointsService.IMAGE_ROOT}/${imageId}`;
  }
}
