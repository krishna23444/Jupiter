import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { DatabsModel } from '../../models/database';
import { DatabasesService } from '../../services/databases.service';
import {TabViewModule} from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DatabaseShared } from './databaseShared.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.scss']

})
export class RessourcesComponent implements OnInit {
  private databases:DatabsModel[] = [];
  selectedDatabases:DatabsModel[] = [];
  public itMe:String="";
  error=false;
  deleteError=false;
  private item:DatabsModel;//=new DatabsModel('','','','','','','','','','','',false,false,'','');
  private errorMessage:any = '';
  constructor(private databasesService: DatabasesService, private databaseShared:DatabaseShared, private router:Router, private authenticationService:AuthenticationService) { }
  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
  ngOnInit() {
    this.itMe=this.authenticationService.getEmail();

    this.databasesService.getDatabases()
    .subscribe(
      database => this.databases = database,

      error => this.errorMessage = <any>error);
  }


  delete(event){
    let errorBool=false;

    console.log(" what is heppening "+ this.selectedDatabases[0]._id);

    for (var i = 0; i < this.selectedDatabases.length; i++) {
      if(this.selectedDatabases[i].createdBy!=this.itMe)
      {
        errorBool=true;
      }
    }     
    console.log(" what is heppening out "+this.deleteError);
    if(errorBool==false)
    {
      for (var i = 0; i < this.selectedDatabases.length; i++) {
        this.databasesService.deleteDatabase(this.selectedDatabases[i]).finally(() => {   

      this.databasesService.getDatabases().finally(() => {   
      //  this.done=false;
        //setTimeout(() => this.done = true, 0);
              this.selectedDatabases=[];
      })
        .subscribe(
          database => this.databases = database,
          error => this.errorMessage = <any>error);
        }).subscribe();





  
      }
    }
    else
    {
      this.selectedDatabases=[];
      this.deleteError=false;

      setTimeout(() => this.deleteError = true, 0);
    }

  }
  create(event)
  {
    this.router.navigate(['resources/create']);

  }
  onSelect(item:DatabsModel)
  {
    this.databaseShared.setItem(item);
  }

  selectDatabase(item:DatabsModel) {
    this.databaseShared.setItem(item);
    console.log(JSON.stringify(item));
    console.log(JSON.stringify(this.databaseShared.getItem()));

   this.router.navigate(['resources/show']);

  }
  editDatabase(item:DatabsModel) {
    if(this.itMe!=item.createdBy)
    {

      this.error=false;
      setTimeout(() => this.error = true, 0);

    }
    else
    {
      this.databaseShared.setItem(item);
      console.log(JSON.stringify(item));
      console.log(JSON.stringify(this.databaseShared.getItem()));

      this.router.navigate(['resources/edit']);
    }
  }
}
