import { Component, Input } from '@angular/core';
import { User } from 'src/app/user/models/user';

@Component({
  selector: 'app-user-info-tab',
  templateUrl: './user-info-tab.component.html',
  styleUrls: ['./user-info-tab.component.css']
})
export class UserInfoTabComponent {

  @Input()
  userInfo!: User;
}