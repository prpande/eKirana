import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router:Router) { }

  goToHome(){
    this.router.navigate([""]);
  }

  goToLogin(){
    this.router.navigate(["login"]);
  }

  goToRegistration(){
    this.router.navigate(["register"]);
  }

  goToUserDash(){
    this.router.navigate(["dashboard"]);
  }
}
