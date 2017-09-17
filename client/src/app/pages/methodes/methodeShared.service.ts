import {Injectable,EventEmitter,Output} from '@angular/core';
import { MethodModel } from '../../models/method';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class MethodeShared {
  item: MethodModel;//=new MethodModel('','','','','','','','','','',false,'','');  
  url:String;
  @Output() fire: EventEmitter<any> = new EventEmitter();
  private subject = new Subject<any>();

  constructor() {
  }
  change() {
    console.log('change started'); 
    this.fire.emit(true);
  }

  getEmittedValue() {
    return this.fire;
  }

  setItem(item:MethodModel) {
    this.item = item;

    /*this.itemChangeObserver.emit(this.item); 
    return this.itemChangeObserver;*/
  } 
  getItemObserval(): Observable<MethodModel> {
    return this.subject.asObservable();
  }
  getItem():MethodModel {
    return this.item;
  } 
  setUrl(url:String) {
    this.url = url;
    /*this.itemChangeObserver.emit(this.item); 
    return this.itemChangeObserver;*/
  } 
  getUrl():String {
    return this.url;
  } 
}