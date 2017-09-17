import {Injectable,EventEmitter,Output} from '@angular/core';
 import { DatabsModel } from '../../models/database';

@Injectable()
export class DatabaseShared {
item: DatabsModel;//=new DatabsModel('','','','','','','','','','','',false,false,'','');   
@Output() itemChangeObserver=new EventEmitter();
 
  constructor() {
  }

  setItem(item:DatabsModel) {
    this.item = item;
    /*this.itemChangeObserver.emit(this.item); 
    return this.itemChangeObserver;*/
  } 
  getItem():DatabsModel {
     return this.item;
  } 
}