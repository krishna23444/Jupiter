import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators , FormControl} from '@angular/forms';
import { DatabsModel } from '../../../models/database';
import { DatabasesService } from '../../../services/databases.service';
import { sensorTypes } from '../databases/ressources.data';
import { NgUploaderOptions } from 'ngx-uploader';
import {FileUploadModule} from 'primeng/primeng';
import { Router} from '@angular/router';//routing
import { DatabaseShared } from '../databaseShared.service';

@Component({
   moduleId: module.id,

  selector: 'app-databases',
  templateUrl: './editDatabase.component.html',
  styleUrls: ['./editDatabase.component.scss'],

})
 
export class EditDatabaseComponent implements OnInit{
  public sensors: any[];
      database: DatabsModel;

  /* [{'type': 'Synthetic Generator'}, {'type': 'Capactive'}, {'type': 'Optical'},
{'type': 'Thermal'}, {'type': 'Pressire'}, {'type': 'RF'}, {'type': 'Ultrasonic'}];
*/
public form:FormGroup;
   uploadedFiles: any[] = [];

  public submitted:boolean = false;
  constructor(fb:FormBuilder,private router: Router, private databasesService: DatabasesService,public databaseShared: DatabaseShared) {
  this.sensors=sensorTypes;
      this.database=this.databaseShared.getItem();

   this.form = fb.group({
     '_id':[ this.database._id],
       'name' : [ this.database.name]  ,
    'resolution' : [this.database.resolution],
    'sensor' : [this.database.sensor],
    'modality' : [this.database.modality],
    'numberTot' : [this.database.numberTot/this.database.numberScans],
    'numberScans' : [this.database.numberScans],
    'note' : [this.database.note],
    'type':[this.database.type],
     'modalities' : [''],
    'ref' : [this.database.ref],
    'publicDatabase':this.database.publicDatabase,
     'preTraited':this.database.preTraited,
     'createdBy' : [this.database.createdBy],
     });
  }
  ngOnInit()
  {
 
this.database=this.databaseShared.getItem();
console.log(JSON.stringify(this.database));
  }

    onUpload(event) {

        for(let file of event.files) {
            this.uploadedFiles.push(file);
            console.log("ooooo");
        }

      }
    isChecked: boolean = false;

  public uploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
 public onSubmit(model: DatabsModel): void
     {
       this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      console.log(model);
      this.databasesService.updateDatabase(model);
         this.router.navigate(['resources']);

        
    }
  }

  

}
