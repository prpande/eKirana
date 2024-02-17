import { Component, Input } from '@angular/core';
import { Address } from 'src/app/user/models/address';

@Component({
  selector: 'app-hover-display',
  templateUrl: './hover-display.component.html',
  styleUrls: ['./hover-display.component.css']
})
export class HoverDisplayComponent {
  @Input()
  shop!: Address;

  @Input()
  imgSrc!: string;

  get shopName(): string[]{
    return this.shop.fullName?.split(' ')!;
  }
}
