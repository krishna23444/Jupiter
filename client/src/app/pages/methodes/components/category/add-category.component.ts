 import { Component, OnInit, AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators , FormControl} from '@angular/forms';
import { NgSwitchModule } from 'ng2-switch';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { CodemirrorComponent }      from 'ng2-codemirror';
import { ModalitiesService } from '../../../../services/modality.service';
import { CategoriesService } from '../../../../services/categories.service';
import { MethodsService } from '../../../../services/methods.service';
import { MethodModel } from '../../../../models/method';
import { ModalityModel } from '../../../../models/modality';
import { CategoryModel } from '../../../../models/category';
import {FileUploadModule} from 'primeng/primeng';
import { AuthenticationService } from '../../../../services/authentication.service';
import { AppConfig } from '../../../../app.config';
import 'codemirror/mode/octave/octave'; // import mode
import {GrowlModule} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import { NgUploaderOptions } from 'ngx-uploader';
@Component({
    moduleId: module.id,

  selector: 'nga-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']

})
 
export class AddcategoryComponent implements OnInit{
 sensorTypes: any[]= [{'type': 'Synthetic Generator'}, {'type': 'Capactive'}, {'type': 'Optical'},
{'type': 'Thermal'}, {'type': 'Pressire'}, {'type': 'RF'}, {'type': 'Ultrasonic'}];
  public form:FormGroup;
  public submitted:boolean = false;
  constructor(fb:FormBuilder,private authenticationService:AuthenticationService,private methodsService: MethodsService,private modalitiesService: ModalitiesService,private categoriesService: CategoriesService, private el: ElementRef ) 
{  

    this.form=fb.group({
      'name' : ['']  ,
      'module' : [''],
        'createdBy':[this.authenticationService.getEmail()]
    });
  }
  ngOnInit()
  {
 
  }
    isChecked: boolean = false;
  
 

  public onSubmit(model: CategoryModel): void
  {
      this.submitted = true;
    if (this.form.valid) {

      // your code goes here
      // var item:MethodModel=new MethodModel('',this.form.controls['name'].getValue(),this.form.modality,this.form.module,this.form.category,
      //  this.form.ref,this.form.description, this.form.codeMatlab,'user',false,'','');
      console.log(model);
      this.categoriesService.createCategory(model);
 

    }
  }
  }
 