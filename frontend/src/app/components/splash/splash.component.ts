import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/app.module';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
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

  constructor(private shopService: UserService, private restErrorSvc: RestErrorHandlerService, private logger: LoggerService) {
    this.shops = [];
  }

  ngOnInit(): void {
    if (GlobalConstants.IS_TEST_ENV) {
      return;
    }
    this.shopService.getShops().subscribe({
      next: data => {
        this.shops = data;
      },
      error: err => {
        this.restErrorSvc.processFetchError(err);
      }
    })
  }
}
