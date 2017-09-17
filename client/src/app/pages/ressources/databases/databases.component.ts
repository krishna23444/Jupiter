import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators , FormControl} from '@angular/forms';
import { DatabsModel } from '../../../models/database';
import { User } from '../../../models/user';
import { DatabasesService } from '../../../services/databases.service';
import { sensorTypes } from './ressources.data';
import { NgUploaderOptions } from 'ngx-uploader';
import {FileUploadModule} from 'primeng/primeng';
import { Router} from '@angular/router';//routing
import { AuthenticationService } from '../../../services/authentication.service';
import {ChipsModule} from 'primeng/primeng';

@Component({
  moduleId: module.id,

  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss']
})

export class DatabasesComponent implements OnInit{
  public sensors: any[];
  /* [{'type': 'Synthetic Generator'}, {'type': 'Capactive'}, {'type': 'Optical'},
{'type': 'Thermal'}, {'type': 'Pressire'}, {'type': 'RF'}, {'type': 'Ultrasonic'}];
*/

fusion=false;
type="Unimodal";
public form:FormGroup;
uploadedFiles: File[] = [];
modalities: string[];

public submitted:boolean = false;
constructor(fb:FormBuilder,private router: Router, private databasesService: DatabasesService,private authenticationService:AuthenticationService) {
 
   this.sensors=sensorTypes;
  this.form = fb.group({
    'name' : ['']  ,
    'resolution' : [''],
    'sensor' : [''],
    'modality' : [''],
    'numberTot' : [''],
    'numberScans' : [''],
    'note' : [''],
    'type':[''],
     'modalities' : [],
    'ref' : [''],
    'publicDatabase':false,
     'preTraited':false,
     'createdBy' : [this.authenticationService.getEmail()],

    
  });
}
ngOnInit()
{
  
}
onProgress(event) {

 
         console.log('holla'+event.progress);

   
} 
showFusion(event)
{
if(this.form.controls['type'].value=="Unimodal")
{
this.fusion=false;

}else
{
  this.fusion=true;

}

}
onUpload(event) {

  for(let file of event.files) {
    this.uploadedFiles.push(file);
  }
 
  
} 
isChecked: boolean = false;

public onSubmit(model: DatabsModel): void
{
  this.submitted = true;
  if (this.form.valid) {
    // your code goes here
    console.log(model);
       model.numberTot=model.numberScans*model.numberTot;

   //   this.databasesService.uploadDatabase();
 if(this.form.controls['type'].value!="Unimodal")
  model.modality=this.form.controls['modalities'].value.join('-'); 
    this.databasesService.createDatabase(model,this.uploadedFiles);
    this.router.navigate(['resources']);
   
  }
}



}
