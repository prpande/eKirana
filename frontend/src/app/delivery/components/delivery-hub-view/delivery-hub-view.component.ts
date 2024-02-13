import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { MapDialogComponent } from 'src/app/shared/components/map-dialog/map-dialog.component';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-delivery-hub-view',
  templateUrl: './delivery-hub-view.component.html',
  styleUrls: ['./delivery-hub-view.component.css']
})
export class DeliveryHubViewComponent implements OnInit {


  constructor(private authService: AuthService,
    private mapDialog: MatDialog,
    private logger: LoggerService,
    private restErrorSvc: RestErrorHandlerService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.authService.goHomeIfNotAllowed(UserType.CARRIER);
  }

  updateLocation() {
    let userId = this.authService.UserCredentials.userId
    let title = `Update Location for Carrier: ${userId}`;

    const dialogRef = this.mapDialog.open(MapDialogComponent, {
      data: {
        title: title,
        isDirection: false
      }
    });

    dialogRef.afterClosed().subscribe(info => {
      if (info) {
        this.userService.updateVehicleInfo(info).subscribe({
          next: savedUser => {
            this.logger.info(`Saved Vehicle:[${savedUser.vehicleInfo?.registrationNumber}]`);
          },
          error: err => {
            this.restErrorSvc.processPostError(err);
          }
        })
      }
    })
  }
}
