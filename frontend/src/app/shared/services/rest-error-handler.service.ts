import { Injectable } from '@angular/core';
import { LoggerService } from '../components/logger/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class RestErrorHandlerService {

  constructor(private logger: LoggerService) { }

  processFetchError(error: any) {
    this.processRestError("Unable to fetch data from server. Please try again later.", error);
  }

  processPostError(error: any){
    this.processRestError("Unable to post data to the server. Please try again later.", error);
  }

  private processRestError(message: string, error: any){
    alert(message);

    this.logger.error(message)
    this.logger.error(JSON.stringify(error));
  }
}
