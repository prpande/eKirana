import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-delivery-hub-view',
  templateUrl: './delivery-hub-view.component.html',
  styleUrls: ['./delivery-hub-view.component.css']
})
export class DeliveryHubViewComponent implements OnInit{

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.goHomeIfNotAllowed(UserType.CARRIER);
  }

  updateLocation(){}
}
