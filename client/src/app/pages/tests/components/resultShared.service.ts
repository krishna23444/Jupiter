import {Injectable,EventEmitter,Output} from '@angular/core';
 
@Injectable()
export class ResultShared {
item:any;//=new any('','','','','','','','','','','',false,'','');   
@Output() itemChangeObserver=new EventEmitter();
 
  constructor() {
  }

  setItem(item:any) {
    this.item = item;
    /*this.itemChangeObserver.emit(this.item); 
    return this.itemChangeObserver;*/
  } 
  getItem():any {
     return this.item;
  } 
}