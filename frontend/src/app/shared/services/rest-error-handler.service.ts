import { Injectable } from '@angular/core';
import { LoggerService } from '../components/logger/services/logger.service';
import { InteractionDialogService } from '../components/interaction-dialog/service/interaction-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class RestErrorHandlerService {

  constructor(private logger: LoggerService, private dialogService: InteractionDialogService) { }

  processFetchError(error: any) {
    this.processRestError("Unable to fetch data from server. Please try again later.", error);
  }

  processPostError(error: any){
    this.processRestError("Unable to post data to the server. Please try again later.", error);
  }

  private processRestError(message: string, error: any){
    
    this.logger.error(JSON.stringify(error));
    this.dialogService.openInteractionDialog({
      isConfirmation: false,
      title: message,
      message: error.message
    })
  }
}
