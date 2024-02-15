import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapInteractionService {


  private _hoverId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor() { }

  get HoverId(): string{
    return this._hoverId.value;
  }

  get HoverId$(): Observable<string>{
    return this._hoverId.asObservable();
  }

  set HoverId(shopId: string){
    this._hoverId.next(shopId);
  }

}
