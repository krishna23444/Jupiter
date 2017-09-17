import { Component, OnInit } from '@angular/core'; 
import { ResultShared } from '../resultShared.service';
import { TestsService } from '../../../../services/tests.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
 import * as FileSaver from 'file-saver';
import {DataGridModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {DialogModule,UIChart} from 'primeng/primeng';
 import { TestModel } from '../../../../models/test';


@Component({
  selector: 'app-resultPage',
  templateUrl: './resultsPage.component.html',
  styleUrls: ['./resultsPage.component.scss'],
})
export class ResultsPageComponent implements OnInit {
	item:any={};
  methodes:any[]=[{module:"",category:"",name:""}];
  done=true;
  type="";
  EER_er=0.0;
  errorTime=0.0;
  avaragePretrait=0.0;
  totalPretrait=0.0;
  avarageMatching=0.0;
  totalMatching=0.0;
  data: any;
  data2: any;
  isImageLoading=true;
  fail=false;
  complete=false;
  showImages=false;
  showImagesClicked=false;
  showStatClicked=false;
  folders:any[]=[];
  files:any[]=[];
  rates= [{
    "realrate":[]=[],
    "missrate":[]=[],
    "rates": {
      "minHTER_er": 0.05,
      "minHTER_tr": 0.3540799472,
      "minHTER_frr": 0,
      "minHTER_ver": 1,
      "minHTER_far": 0.1,
      "EER_er": 0.1,
      "EER_tr": 0.3418867221,
      "EER_frr": 0.1111111111,
      "EER_ver": 0.8888888889,
      "EER_far": 0.08888888889,
      "FRR_01FAR_er": 0.05,
      "FRR_01FAR_tr": 0.3540799472,
      "FRR_01FAR_frr": 0,
      "FRR_01FAR_ver": 1,
      "FRR_01FAR_far": 0.1,
      "FRR_10FAR_er": 0.2805555556,
      "FRR_10FAR_tr": 0.2966434397,
      "FRR_10FAR_frr": 0.5111111111,
      "FRR_10FAR_ver": 0.4888888889,
      "FRR_10FAR_far": 0.05,
      "VER_001FAR_er": 0.5027777778,
      "VER_001FAR_tr": 0.197814142,
      "VER_001FAR_frr": 0.8,
      "VER_001FAR_ver": 0.2,
      "VER_001FAR_far": 0.005555555556,
      "VER_01FAR_er": 0.5027777778,
      "VER_01FAR_tr": 0.197814142,
      "VER_01FAR_frr": 0.8,
      "VER_01FAR_ver": 0.2,
      "VER_01FAR_far": 0.005555555556,
      "VER_1FAR_er": 0.4055555556,
      "VER_1FAR_tr": 0.2023063828,
      "VER_1FAR_frr": 0.8,
      "VER_1FAR_ver": 0.2,
      "VER_1FAR_far": 0.01111111111
    }
  }]; 
 

  timesPretrait:any={"totalPretrait":0.0,"avaragePretrait":0.0}
  public charts=[
  {info:" Test are done"
  , number:127
},
{info:"ms total excution time",
number:520},
{info:"  ERR",
number:0.75}];
selectedImage: any;
displayDialog: boolean;
url="";
urlImage="";

constructor(public sanitizer: DomSanitizer, private resultShared:ResultShared, private testsService:TestsService,private router: Router, 
  private route: ActivatedRoute)
{
  this.item.infos={};
  this.data2 = {
    labels:[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.8,0.9,1],
    datasets: [
    {

      label: 'DET',
      data:[0.98, 0.019, 0.012, 0.011, 0.009, 0.007, 0.006,0.0045,0.0023,0.0014,0.001],
      fill: false,
      borderColor: '#565656'
    }
    ]
  };
  this.data = {
    labels:[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.8,0.9,1],
    datasets: [
    {
      label: 'ROC',
      data: [0.02,0.981,0.988,0.991,0.993,0.994,0.9955,0.9977,0.9986,0.999],
      fill: false,
      borderColor: '#4bc0c0'
    } 
    ]
  }
}                    
   tst:TestModel;


selectData(event) {
}
ngOnInit() { 
  this.item.infos.type="";
  var savedItem=this.resultShared.getItem();
  this.testsService.getTestById(savedItem.testId).finally(() => { 
  this.methodes=this.tst.methodNames;
      this.done=false;
      setTimeout(() => this.done = true, 0);
       console.log("whaaaaaaaaaaaaaaaaaaaat "+JSON.stringify(this.methodes));  }).subscribe(
    database => {
      this.tst = database;

    });;
// console.log("IDDDDDDD  "+JSON.stringify(savedItem));
  if(savedItem!=null)
  {
    this.testsService.getResultById(savedItem._id).finally(() => {   
      //  this.done=false;
      //setTimeout(() => this.done = true, 0);
      this.fail=this.item.infos.fail;
      this.complete= this.item.infos.complete;
      this.showImages=this.item.infos.savingResults;
      // this.timesPretrait=this.item.infos.timesPretrait;
      //this.files=this.item.files;
      
    //  console.log("whaaaaaaaaaaaaaaaaaaaat befooooooooooore"+this.complete);


      this.type="";
      if(!this.fail)
      {
        //  

        this.avaragePretrait=this.item.infos.timesPretrait.avaragePretrait;
        this.totalPretrait=this.item.infos.timesPretrait.totalPretrait;
     //   console.log(" wooooooow  length"+ this.item.folders.length);

     //   for(var i=0;i<this.item.folders.length;i++)
        {
          //if(this.item.folders[i]!="statistics")
          {     
       //     console.log(" wooooooow  "+ this.item.folders[i]);
            this.folders=this.item.folders;
          }
        }
        if(this.complete)
        {
          this.EER_er=this.item.infos.rates.EER_er;
          this.avarageMatching=this.item.infos.timesMatching.avarageMatching;
          this.totalMatching=this.item.infos.timesMatching.totalMatching;
          // console.log("whaaaaaaaaaaaaaaaaaaaat "+this.complete);
       //   // this.data.labels=this.item.infos.realrate;
         // console.log("size test  "+ this.data.labels.length);
          // this.data2.labels=this.item.infos.realrate;

          //  this.data2.labels=this.item.infos.realrate;
          var yy=[];
          for(var i=0;i<this.item.infos.realrate.length;i++)
          {
            yy[i]=Math.round(this.item.infos.realrate[i]*10)/10;
            yy[i]=Math.round(this.item.infos.realrate[i]*10)/10;
            // console.log("whaaaaaaaaaaaaaaaaaaaat "+ this.data2.labels[i]);
          //  this.data2.datasets[0].data[i]=1-Math.round(this.item.infos.missrate[i]*10)/10;
         //   this.data.datasets[0].data[i]=Math.round(this.item.infos.missrate[i]*10)/10;

          }
        //  this.data.labels=yy;
         // this.data2.labels=yy;
          // console.log("whaaaaaaaaaaaaaaaaaaaat "+ JSON.stringify(yy));
          this.done=false;
          setTimeout(() => this.done = true, 0);
        }
      }
      else
      {
        this.errorTime=this.item.infos.errorTime;
      }

      setTimeout(() =>this.complete= this.item.infos.complete, 0);
      setTimeout(() =>this.fail= this.item.infos.fail, 0);
    }).subscribe(
    database => {
      this.item = database;

    });
  }
}  
findClosest(x, arr) {
  var indexArr = arr.map(function(k) { return Math.abs(k - x) });
  var min = Math.min.apply(Math, indexArr);
  return indexArr.indexOf(min);
}
create()
{
  this.router.navigate(['tests/']);

}
goList()
{
  this.router.navigate(['results/']);

}
 ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            var row = "";
 
            for (var index in objArray[0]) {
                //Now convert each value to string and comma-separated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            str += row + '\r\n';
 
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','
 
                    line += array[i][index];
                }
                str += line + '\r\n';
            }
            return str;
        }
download()
{
    this.rates[0].missrate=this.item.infos.missrate;
  this.rates[0].realrate=this.item.infos.realrate;
  this.rates[0]=this.item.infos.rates;

   // FileSaver.saveAs(blob, "Export.csv"); 

     var csvData = this.ConvertToCSV(this.rates);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Results.csv';
    a.click();
   }
      getFilesOfFolder(folder:any,b:any)
      {

        //var urlCreator = window.URL;
      /*  if (folder=="statistics") {
         
         this.rates[0].rates=this.item.infos.rates;
         this.rates[0].missrate=this.item.infos.missrate;
         this.rates[0].realrate=this.item.infos.realrate;

          this.showStatClicked=false;
          setTimeout(() =>this.showStatClicked= true, 0);

         // this.showStatClicked=true;
          alert("olla"+JSON.stringify(this.rates));
        } */  
        //  else
        {
          this.showStatClicked=false;

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
  }


