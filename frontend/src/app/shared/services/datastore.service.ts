import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  private key = "e-Kirana-Datastore-Key";

  constructor() { }
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }
  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

  saveData(key: string, value: any){
    let dataStr = JSON.stringify(value);
    let encDataStr = this.encrypt(dataStr);
    localStorage.setItem(key, encDataStr);
  }

  getData<T>(key:string): T | undefined{
    let encDataStr = localStorage.getItem(key);
    if(encDataStr)
    {
      let dataStr = this.decrypt(encDataStr);
      let value = JSON.parse(dataStr) as T
      return value;
    }

    console.warn(`Value not found for key:[${key}]`);
    return undefined;
  }

  removeData(key: string){
    localStorage.removeItem(key);
  }
}
