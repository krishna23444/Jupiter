import { Component, OnInit, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators , FormControl} from '@angular/forms';
import { NgSwitchModule } from 'ng2-switch';
import { Router} from '@angular/router';//routing
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { CodemirrorComponent }      from 'ng2-codemirror';
import {FileUploadModule} from 'primeng/primeng';
import { ModalitiesService } from '../../../../services/modality.service';
import { CategoriesService } from '../../../../services/categories.service';
import { MethodsService } from '../../../../services/methods.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { MethodModel } from '../../../../models/method';
import { ModalityModel } from '../../../../models/modality';
import { CategoryModel } from '../../../../models/category';
import { AppConfig } from '../../../../app.config';
import 'codemirror/mode/octave/octave'; // import mode
import {GrowlModule} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import { Subject } from 'rxjs/Subject';
import { MethodeShared } from '../../methodeShared.service';

@Component({
  moduleId: module.id,
  selector: 'app-baMethod',
  templateUrl: './baMethod.component.html',
  styleUrls: ['./baMethod.component.scss'],

})

export class BaMethodComponent implements OnInit   {
  public modalities:ModalityModel[]=[];//liste of modalities
  public categories:CategoryModel[]= [];//liste of categories
  public modules: any[]=["Segmentation","Normalisation","Filtering","Binarisation","Thining","Extraction","Matching"];//liste of modules
  public form:FormGroup;
  public formModality:FormGroup;
  bddNeeed:boolean=false;
keyError="";
  public submitted:boolean = false;
  private errorMessage:any = '';
  public fileString; 
  keys:any[]=[];
  msgs: Message[] = [];
needed=false;
done=true;
  public octaveConfig = {
    lineNumbers: true,
    mode: 'octave',
    theme:'mdn-like'
  };
  hideModal: boolean = false;
  public static updateStuff: Subject<any> = new Subject();
  isChecked: boolean = false;
  constructor(private router: Router,fb:FormBuilder,private authenticationService:AuthenticationService,private http: Http,
    private methodsService: MethodsService,public methodeShared: MethodeShared,private modalitiesService: ModalitiesService,private categoriesService: CategoriesService, 
    private el: ElementRef ) {
    //  this.sensors=sensorTypes;
  //console.log("whyyy"+this.authenticationService.getUser().email+"hey"+JSON.stringify(this.authenticationService.getUser()))
    this.form = fb.group({
      'name' : ['']  ,
      'name2' : ['']  ,
      'publicMethod' : [false],
      'modality' : [''],
      'category' : [''],
      'module' : [''],
      'description' : [''],
      'needBDD' : [false],
      'code' : ['Please upload a script'],
      'codeMatlab' : [],
      'codeMatlab2' : [],
      'ref' : [''],
      'createdBy':[this.authenticationService.getEmail()]
    });


    this.fileString;
this.needed=false;
  }


  public ngOnInit() {

    this.modalitiesService.getModalities()
    .subscribe(  modality => this.modalities = modality,
      error => this.errorMessage = <any>error);
     //  this.codemirrorComponent.instance.setOption('mode', 'octave');


    this.categoriesService.getCategories()
    .subscribe(  category => this.categories = category,
      error => this.errorMessage = <any>error);
     

 this.methodsService.getKeys()
    .subscribe(  category => this.keys = category,
      error => this.errorMessage = <any>error);

     //  this.codemirrorComponent.instance.setOption('mode', 'octave');
  }

public onChangeSwitch(event)
{

  this.isChecked=true;
}
public onChangeSwitch2(event)
{

  this.needed=!this.needed; //to switch

  
}
cancel(event)
{
  this.router.navigate(['methods']);

}
checkKey(key)
{
this.keyError=key; 
var found=false;
for(var i=0;i<this.keys.length;i++)
{
if(this.keys[i].name==key)
{
  found=true;
}
if(found)
{
this.keyError=" The name "+key+" is already reserved ! ";
}
else
{
  this.keyError="";
}

}

}
public onSubmit(model: any): void
{
  this.submitted = true;

  if (this.form.valid) {
    // your code goes here
    // var item:MethodModel=new MethodModel('',this.form.controls['name'].getValue(),this.form.modality,this.form.module,this.form.category,
    //  this.form.ref,this.form.description, this.form.codeMatlab,'user',false,'','');
    this.methodsService.createMethod(model);
    this.methodeShared.change();

   this.router.navigate(['methods']);


  }

}
  updateSelectModality(modality:string)
  {
   if(modality=="Multimodal")
     {
       this.modules=[];
       this.modules=["Features Fusion","Scores Fusion"];
     }
     else
     {
         this.modules=[];
         this.modules=["Normalisation","Segmentation","Filtering","Binarisation","Thining","Extraction","Matching"];
     }
        

 }
  getCategory(module: string )
        {
          // // // console.log("2 "+module);
          this.categoriesService.getCategoriesByModule(module).finally(() => {   // // // 
            console.log(" za3ma"+JSON.stringify(this.categories));
            this.done=false;
            setTimeout(() => this.done = true, 0);
           
          }).subscribe(
          categories =>{
            this.categories=[];
             this.categories= categories; 
            // Do anything else with the `this.item` here.
          } ,
          error => this.errorMessage = <any>error);
        }
 updateSelect()
 {
 
     this.modalitiesService.getModalities()
    .subscribe(  modality => this.modalities = modality,
      error => this.errorMessage = <any>error);
     //  this.codemirrorComponent.instance.setOption('mode', 'octave');


    this.categoriesService.getCategories()
    .subscribe(  category => this.categories = category,
      error => this.errorMessage = <any>error);
     //  this.codemirrorComponent.instance.setOption('mode', 'octave');


}
updateSelectModule(moduleName:string)
{
  console.log('stupid youuuuuuuuuuuuu '+moduleName);
  if(moduleName=="Extraction" || moduleName=="Matching")
  {
 this.bddNeeed=true;
  }
  else{
 this.bddNeeed=false;

  }
       this.getCategory(moduleName);

}
public onFileChange(event)
{

  console.log("the file has changed:", event);

  // this.readThis(event.file);
  let  str="";
  var file: File = event.files[0];
  var reader = new FileReader();
  reader.onload = (function(f) {
    return function(e) {
      // Here you can use `e.target.result` or `this.result`
      // and `f.name`.   

      str=e.target.result;
      console.log('TEST');
      this.form.controls['code'].setValue(str);
      this.form.controls['codeMatlab'].setValue(str);

    };
  })(file).bind(this);
  reader.readAsText(file); 
}
public onFileChange2(event)
{

  console.log("the file has changed:", event);

  // this.readThis(event.file);
  let  str="";
  var file: File = event.files[0];
  var reader = new FileReader();
  reader.onload = (function(f) {
    return function(e) {
      // Here you can use `e.target.result` or `this.result`
      // and `f.name`.   

      str=e.target.result;
      this.form.controls['code'].setValue(str);

      this.form.controls['codeMatlab2'].setValue(str);

    };
  })(file).bind(this);
  reader.readAsText(file); 





}
} 