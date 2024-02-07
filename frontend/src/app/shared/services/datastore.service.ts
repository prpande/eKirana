import { Injectable } from '@angular/core';
import *  as CryptoJS from 'crypto-js';
import { LoggerService } from '../components/logger/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  private key = "e-Kirana-Datastore-Key";

  constructor(private logger: LoggerService) { }
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }
  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  saveData(key: string, value: any) {
    this.logger.info(`Saving data for:[${key}]`);
    let dataStr = JSON.stringify(value);
    let encDataStr = this.encrypt(dataStr);
    localStorage.setItem(key, encDataStr);
  }

  getData<T>(key: string): T | undefined {
    this.logger.info(`Getting data for:[${key}]`);
    let encDataStr = localStorage.getItem(key);
    if (encDataStr) {
      let dataStr = this.decrypt(encDataStr);
      let value = JSON.parse(dataStr) as T
      return value;
    }

    this.logger.warn(`Value not found for key:[${key}]`);
    return undefined;
  }

  removeData(key: string) {
    this.logger.info(`Removing data for:[${key}]`);
    localStorage.setItem(key, "");
    localStorage.removeItem(key);
  }
}
