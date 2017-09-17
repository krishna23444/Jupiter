import { Component, OnInit, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators , FormControl} from '@angular/forms';
import { NgSwitchModule } from 'ng2-switch';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { CodemirrorComponent }      from 'ng2-codemirror';
import { ModalitiesService } from '../../../../services/modality.service';
import { CategoriesService } from '../../../../services/categories.service';
import { MethodsService } from '../../../../services/methods.service';
import { MethodModel } from '../../../../models/method';
import { ModalityModel } from '../../../../models/modality';
import { CategoryModel } from '../../../../models/category';
import {FileUploadModule} from 'primeng/primeng';
import { AppConfig } from '../../../../app.config';
import 'codemirror/mode/octave/octave'; // import mode
import { MethodeShared } from '../../methodeShared.service';
import { MethodesComponent } from '../../methodes.component';

 @Component({
  moduleId: module.id,
  selector: 'app-editMethod',
  templateUrl: './editMethod.component.html',
  styleUrls: ['./editMethod.component.scss'],
  providers: [MethodsService,CategoriesService,ModalitiesService]

})

export class EditMethodComponent implements OnInit   {
  public modalities:ModalityModel[]=[];//liste of modalities
  public categories:CategoryModel[]= [];//liste of categories
  public modules: any[];//liste of modules
  public form:FormGroup;
  public formCategory:FormGroup;
  public formModality:FormGroup;
  method: MethodModel;

  public submitted:boolean = false;
  private errorMessage:any = '';
  public fileString; 
  public octaveConfig = {
    lineNumbers: true,
    mode: 'octave',
    theme:'mdn-like'
  };
url="";
  constructor(private router: Router,private authenticationService:AuthenticationService,public methodeShared: MethodeShared,private modalitiesService: ModalitiesService,private categoriesService: CategoriesService, fb:FormBuilder,private http: Http,private methodsService: MethodsService, private el: ElementRef ) {
    //  this.sensors=sensorTypes;

    this.method=this.methodeShared.getItem();
    // console.log(JSON.stringify(this.method));

    this.form = fb.group({
     '_id' : [this.method._id]  ,
      'name' : [this.method.name]  ,
      'publicMethod' : [this.method.publicMethod],
      'modality' : [this.method.modality],
      'category' : [this.method.category],
      'module' : [this.method.module],
      'description' : [this.method.description],
      'codeMatlab' : [this.method.codeMatlab],
      'ref' : [this.method.ref],
      'url' : [this.methodeShared.getUrl()],
     'createdBy':[this.authenticationService.getEmail()],
      'needBDD' : [this.method.needBDD],
      'code' : [this.method.codeMatlab],
      'codeMatlab2' : [this.method.codeMatlab2],

    });
this.url=this.method.url;
    // console.log("please i can't stand it ", this.url);

    this.modalitiesService.getModalities()
    .subscribe(  modality => this.modalities = modality,
      error => this.errorMessage = <any>error);
    //  this.codemirrorComponent.instance.setOption('mode', 'octave');


    this.categoriesService.getCategories()
    .subscribe(  category => this.categories = category,
      error => this.errorMessage = <any>error);
    this.fileString;

  }
  isChecked: boolean = false;

  public ngOnInit() {

  }
  cancel(event)
  {
    this.router.navigate(['methods']);

  }

  public onSubmit(model: MethodModel): void
  {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // var item:MethodModel=new MethodModel('',this.form.controls['name'].getValue(),this.form.modality,this.form.module,this.form.category,
      //  this.form.ref,this.form.description, this.form.codeMatlab,'user',false,'','');
      // console.log(model);
      model.url=this.url;   
            this.methodeShared.change();
 
      this.methodsService.updateMethod(model);
     // MethodesComponent.done=false;
 

    }
    this.router.navigate(['methods']);

  }



  public onFileChange(event: any)
  {

    // console.log("the file has changed:", event);

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

        this.form.controls['codeMatlab'].setValue(str);

      };
    })(file).bind(this);
    reader.readAsText(file); 





  }
  public onFileChange2(event)
{

  // console.log("the file has changed:", event);

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