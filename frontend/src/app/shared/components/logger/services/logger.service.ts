import { Injectable } from '@angular/core';
import { LogLevel } from '../models/LogLevel';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {

  constructor() { }
  info(msg: string): void {
    this.logWith(LogLevel.Info, msg);
  }
  warn(msg: string): void {
    this.logWith(LogLevel.Warn, msg);
  }
  error(msg: string): void {
    this.logWith(LogLevel.Error, msg);
  }
  debug(msg: string): void {
    this.logWith(LogLevel.Debug, msg);
  }
  private logWith(level: any, msg: string): void {
    let callingMethod = this.getInvokingMethodName();
    let formattedMsg = `[${(new Date()).toISOString()}]\t[${level}]\t[${callingMethod}]:\t${msg}`;
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
