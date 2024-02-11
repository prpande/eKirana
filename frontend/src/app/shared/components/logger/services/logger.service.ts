import { Injectable } from '@angular/core';
import { LogLevel } from '../models/LogLevel';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {

  constructor() { }
  info(msg: any): void {
    this.logWith(LogLevel.Info, msg);
  }
  warn(msg: any): void {
    this.logWith(LogLevel.Warn, msg);
  }
  error(msg: any): void {
    this.logWith(LogLevel.Error, msg);
  }
  debug(msg: any): void {
    this.logWith(LogLevel.Debug, msg);
  }
  private logWith(level: any, msg: any): void {
    let callingMethod = this.getInvokingMethodName();
    let msgStr = JSON.stringify(msg)
    let formattedMsg = `[${(new Date()).toISOString()}]\t[${level}]\t[${callingMethod}]:\t${msgStr}`;
    switch (level) {
      case LogLevel.None:
        return console.log(formattedMsg);
      case LogLevel.Info:
        return console.log('%c' + formattedMsg, 'color: #6495ED');
      case LogLevel.Warn:
        return console.warn('%c' + formattedMsg, 'color: #FF8C00');
      case LogLevel.Error:
        return console.error('%c' + formattedMsg, 'color: #DC143C');
      default:
        console.debug(formattedMsg);
    }
  }

  private getInvokingMethodName() {
    return (new Error()).stack?.split("\n")[4].trim().split(" ")[1];
  }
}
