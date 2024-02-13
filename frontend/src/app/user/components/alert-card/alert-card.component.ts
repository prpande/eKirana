import { Component, Input } from '@angular/core';
import { Alert } from '../../models/alert';
import { AlertLevel } from '../../models/alertLevel';

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.css']
})
export class AlertCardComponent {

  @Input()
  alert!: Alert;
  constructor(){
  }

  get isLow(): boolean{
    return this.alert.level == AlertLevel.LOW;
  }

  get isMedium(): boolean{
    return this.alert.level == AlertLevel.MEDIUM;
  }

  get isCritical(): boolean{
    return this.alert.level == AlertLevel.CRITICAL;
  }

  get timeStampDate(): string {
    return (new Date(this.alert.timeStamp!.toString())).toDateString();
  }

  get timeStampTime(): string {
    return (new Date(this.alert.timeStamp!.toString())).toLocaleTimeString();
  }
}
