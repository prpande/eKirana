import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title:string;
  loggedIn:boolean;

  constructor(){
    this.title = "e-Kirana";
    this.loggedIn = true;
  }

  logout(){

  }
}
