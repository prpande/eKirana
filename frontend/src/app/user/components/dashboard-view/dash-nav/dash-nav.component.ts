import { Component } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent{

  constructor(private authService: AuthService){}

  get isCarrier(): boolean{
    return this.authService.isCarrier;
  }

}
