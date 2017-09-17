import { Component, OnInit, Input } from '@angular/core';
import { NgSwitchModule } from 'ng2-switch';
import { DatabsModel } from '../../../models/database';
import { Image } from '../../../models/image';
import { DatabaseShared } from '../databaseShared.service';
import {DataGridModule} from 'primeng/primeng';
import { DatabasesService } from '../../../services/databases.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-showDatabase',
  templateUrl: './showDatabase.component.html',
  styleUrls: ['./showDatabase.component.scss'],
  providers: []

})

export class ShowDatabaseComponent implements OnInit   {
  database: DatabsModel;
    public itIsMe:boolean=true;

  files:any[]=[];
  selectedImage: any;
  displayDialog: boolean;
  public modules: any[];//liste of modules
  Message:any = '';
  item:any={};
  isImageLoading=true;
  fail=false;
  complete=false;
  showImages=false;
  showImagesClicked=false
  url="";
  urlImage="";
  constructor(public sanitizer: DomSanitizer,private databasesService: DatabasesService,private authenticationService:AuthenticationService,public databaseShared: DatabaseShared,private router: Router, 
    private route: ActivatedRoute) {


  }

  public ngOnInit() {
    this.database=this.databaseShared.getItem();
    console.log(JSON.stringify(this.database));
    this.databasesService.getDatabase(this.database._id).finally(() => {   
    this.itIsMe=(this.authenticationService.getEmail()== this.database.createdBy);

    }).subscribe(
    database => {
      this.item = database;
      if(this.item.folders.length<=0)
      {
        var b=0;
        this.files=[];
        //   console.log("heeeeeeeeee "+this.item.files[0].name);

        this.files=this.item.files;
        // var str ="";
        for (var i:any =0; i <this.item.files.length; i++) {
          this.url= "http://"+this.sanitizer.bypassSecurityTrustResourceUrl(this.item.files[b][i].file);//"http://localhost:4000/uploads/results/ketimabu@gmail.com/5991e8bb64470013e8c55a0a/filtering/101_5.tif.png");
          this.isImageLoading = true;
          console.log("heeeeeeeeee "+this.item.files[i].name);
          this.files[i].name=this.item.files[i].name;
          this.files[i].file=this.item.files[i].file;  
        }
        this.showImagesClicked=false;
        setTimeout(() =>this.showImagesClicked= true, 0);
      }
else
{

} 

   });
  }

  getFilesOfFolder(folder:any,b:any)
  {

    //var urlCreator = window.URL;
    //alert("olla"+folder+"hhhhhhh"+i);
    this.files=[];
    this.files=this.item.files[b];
    // var str ="";
    for (var i:any =0; i <this.item.files[b].length; i++) {
      this.url= "http://"+this.sanitizer.bypassSecurityTrustResourceUrl(this.item.files[b][i].file);//"http://localhost:4000/uploads/results/ketimabu@gmail.com/5991e8bb64470013e8c55a0a/filtering/101_5.tif.png");
      this.isImageLoading = true;
      //  console.log("heeeeeeeeee "+this.item.files[b][i].file);
      this.files[i].name=this.item.files[b][i].name;
      this.files[i].file=this.item.files[b][i].file;

    }
    this.showImagesClicked=false;
    setTimeout(() =>this.showImagesClicked= true, 0);

  }
  selectImage(image: any) {
    this.selectedImage = image;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedImage = null;
  }
  createImageFromBlob(image: Blob):any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      var ba3=reader.result;
      return ba3;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
       /* this.testsService.getImage(  this.item.files[b][i].file).finally(() => { 
          this.files[i].name=this.item.files[b][i].name;
        this.isImageLoading = false;
          this.showImagesClicked=false;
  setTimeout(() =>this.showImagesClicked= true, 0); }).subscribe(data => { 
    this.urlImage=this.createImageFromBlob(data);
        
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });*/
    }

  goList()
  {
        this.router.navigate(['resources/']);

  }
  download()
  {
    console.log("heeeeeeeee");
    /*let blob = new Blob([this.method.codeMatlab], {
            type: "text/plain"
        });
    FileSaver.saveAs(blob, this.method.name+".m");  */
  }
  } 