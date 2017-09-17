import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators , FormControl} from '@angular/forms';
import { ModalitiesService } from '../../../../services/modality.service';
import { CategoriesService } from '../../../../services/categories.service';
import { MethodsService } from '../../../../services/methods.service';
import { DatabasesService } from '../../../../services/databases.service';
import { TestsService } from '../../../../services/tests.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Router} from '@angular/router';//routing
import {PickListModule} from 'primeng/primeng';
import {GrowlModule,TabViewModule} from 'primeng/primeng';
import {StepsModule,MenuItem} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';
import { DatabsModel } from '../../../../models/database';
import { User } from '../../../../models/user';
import { NgUploaderOptions } from 'ngx-uploader';
import {FileUploadModule} from 'primeng/primeng';
import { MethodModel } from '../../../../models/method';
import { ModalityModel } from '../../../../models/modality';
import { CategoryModel } from '../../../../models/category';
import { TestModel } from '../../../../models/test';
import {Subscription} from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { ResultShared } from '../resultShared.service';

@Component({
  selector: 'fusion-view',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss']

})

export class FusionComponent {
  public form:FormGroup;
  scan=0;
  busy: Subscription;
  scoreValue=true;
  private item:DatabsModel;
  databases:DatabsModel[] = [];
  databasessaved:DatabsModel[] = [];
  scoresMethods:MethodModel[] = [];
  scoresCategory:any[] = [];
  methodsFeatures:MethodModel[] = [];
  methods:MethodModel[] = [];
  methodsDistance:MethodModel[] = [];
  private errorMessage:any = '';
  done=true;
  public submitted:boolean = false;
  IndividualMax=0;
  isFeaturesFusion=true;
  constructor(fb:FormBuilder,private router: Router, private databasesService: DatabasesService,private methodsService: MethodsService,private modalitiesService: ModalitiesService,private categoriesService: CategoriesService,
    private authenticationService:AuthenticationService,private testsService:TestsService, private resultShared:ResultShared) {
    this.form = fb.group({
      'type': [''],
      'database': [''],
      'matcher': [''],
      'category': ['DCT'],
      'fusionMethod': [''],
      'name': [''],
      'createdBy' : [this.authenticationService.getEmail()]
    });  
    this.methodsService.getMethods().subscribe(
      methods =>{
        this.methods = methods; 
        this.getMethods();


        // Do anything else with the `this.item` here.
      } ,
      error => this.errorMessage = <any>error);
    this.databasesService.getDatabases().finally(() => {       
      this.databasessaved= this.databases;})
    .subscribe( 
      database => this.databases = database,
      error => this.errorMessage = <any>error);
  }
  getCategory(module: string )
  {
    // // // console.log("2 "+module);
    this.categoriesService.getCategoriesByModule(module).finally(() => {   // // // console.log("2 "+JSON.stringify(this.categories));
      
  }).subscribe(
  categories =>{
    this.scoresCategory = categories; 
    console.log(" hey "+JSON.stringify(categories));
    // Do anything else with the `this.item` here.
  } ,
  error => this.errorMessage = <any>error);
}
getMethods()
{

  for(var i=0;i<this.methods.length;i++)
  {
    // console.log(i+"  "+this.methods[22].category);
    // console.log(this.methods.length+" want "+JSON.stringify()+"caaat " );

    if(this.methods[i].module=="Scores Fusion")
    {
      //console.log('i am a methods '+this.methods[i].name);
      this.scoresMethods.push(this.methods[i]);
      this.getCategory("Scores Fusion"); 
      
    }
    
    if(this.methods[i].module=="Features Fusion")
    {
      this.methodsFeatures.push(this.methods[i]);

    }
    
    if(this.methods[i].category=="Distance")
    {
      this.methodsDistance.push(this.methods[i]);

    }
  }

}
getDatabase(id: Number) // onclick of database 
{
  this.databasesService.getDatabase(id).finally(() => { 
    //this.deleteFrom(0);
    console.log("eeeeeeeeey 1"+JSON.stringify(this.item)+"hhhhhhhhhhh"+JSON.stringify(this.item[0]));  
    this.scan= this.item.numberScans;

    this.done=false;

    setTimeout(() => this.done = true, 0);
  }).subscribe(
  database =>{
    this.item = database.infos; 
    // Do anything else with the `this.item` here.
  } ,
  error => this.errorMessage = <any>error);

}
onChange(type) {
  var count=0;
  this.databases=this.databasessaved;
  var databasesTemp:DatabsModel[] = [];
  for(var i = 0; i < this.databases.length; i++)
  {
    if (this.databases[i].type == type) {
      databasesTemp[count]=this.databases[i];
      count++;
    }
  }
  this.databases=[];
  this.databases=databasesTemp;
  if(type=="Features Fusion")
  {
    setTimeout(() => this.scoreValue=false, 0);

  }
  else
  {
    setTimeout(() => this.scoreValue=true, 0);

  }
  this.done=false;
  setTimeout(() => this.done = true, 0);
}

public onSubmit( ): void
{

  let methodNames:any[]=[]; //Liste of methodes
  let createdBy=this.authenticationService.getEmail(); // user email
  let matcher="";
  let beforeRoutine="";
  let numberScans=this.item.numberScans;
  let numberTot= this.item.numberTot;
  let savingResults=1;
  //let modality=  (< FormGroup >this.form.controls['databaseForm']).controls['modality'].value;
  let url=this.item.url;
  let complete=true;
  

  methodNames=[{"order": 1,"category": this.form.controls['name'].value,"name":this.form.controls['fusionMethod'].value,"module":"Scores Fusion"}];
  matcher=this.form.controls['matcher'].value;
  console.log("cilicke Categoryyyyyyyyy "+ this.form.controls['category'].value);

  this.submitted = true;

  if (this.form.valid) {
    // this.router.navigate(['tests/results']);           
    let test:TestModel=new  TestModel('',methodNames,complete,false,createdBy,numberScans,numberTot
      ,0,url,this.item.type,matcher,this.item.modality,beforeRoutine,'');
    console.log(" I AAAAAAAAAM A PREVIEW :  "+JSON.stringify(test));
    this.busy =this.testsService.createTestFusion(test).map(res =>
    {
      //  this.resultShared.setItem(res.json());
      return res.json();
    }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw('Server error')) //...errors if
    .subscribe(
      result=> {
        console.log(' heeeeeeey after '+result._id+"   plz "+JSON.stringify(result));

        this.resultShared.setItem(result);

        var id =result._id;
        this.resultShared.setItem(result);
        console.log(' heeeeeeey after');
        this.router.navigate(['tests/results']);

        // console.log(' heeeeeeey '+JSON.stringify(res.json())); 
      }   );
  }
}


}
