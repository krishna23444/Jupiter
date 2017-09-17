import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { TestsService } from '../../services/tests.service';
import {TabViewModule} from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ResultShared } from '../tests/components/resultShared.service';
import { AuthenticationService } from '../../services/authentication.service';
import {MenubarModule,MenuItem} from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import {DialogModule} from 'primeng/primeng';
 import * as FileSaver from 'file-saver';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import 'rxjs/Rx';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public charts=[
  {info:" Test are done"
  , number:127
},
{info:"ms total excution time",
number:520},
{info:"  ERR",
number:0.75}];
first=true;
rates=[{
    "realrate":[]=[],
    "missrate":[]=[],
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
  }]; 
 

display: boolean = false;
updateMenu=true;
private results:any[] = [];
private resultsModified:any[] = [];
load=true;
selectedResults:any = {};
public itMe:String="";
items: MenuItem[];
items2: MenuItem[];
fail=true;
complete=false;
error=false;
deleteError=false;
private item:any={};
EER_er=0.0;
  avaragePretrait=0.0;
  totalPretrait=0.0;
  avarageMatching=0.0;
  totalMatching=0.0;
private errorMessage:any = '';
constructor(public datepipe: DatePipe,private resultsService: TestsService, private resultShared:ResultShared, private router:Router, private authenticationService:AuthenticationService) { }
public fileUploaderOptions:NgUploaderOptions = {
  // url: 'http://website.com/upload'
  url: '',
};
ngOnInit() {
  this.itMe=this.authenticationService.getEmail();
  this.getResults();
  this.items = [
  {
    label: 'File',
    icon: 'fa-filter',
    items: [{
      label: 'New', 
      icon: 'fa-filter',
      items: [
      {label: 'Project'},
      {label: 'Other'},
      ]
    },
    {label: 'Open'},
    {label: 'Quit'}
    ]
  },
  {
    label: 'Edit',
    icon: 'fa-sort-amount-desc',
    items: [
    {label: 'Undo', icon: 'fa-mail-forward'},
    {label: 'Redo', icon: 'fa-mail-reply'}
    ]
  }
  ];

  this.items2=[
  {
    label: 'Visibilty',
    icon: 'fa-eye-slash',command: (event) => {
     // alert("olla "+this.item.publicResults);
      var toUpdate={publicResults:!this.item.publicResults,_id:this.item._id};
      this.resultsService.updateResults(toUpdate);
      if(!this.item.publicResults)
      {
        this.items2[0].icon="fa-eye";
      }
      else
      {
        this.items2[0].icon="fa-eye-slash";

      }
      this.getResults();

      this.updateMenu=false;
      setTimeout(() =>this.updateMenu=true, 0);

      //event.originalEvent: Browser event
      //event.item: menuitem metadata
    }

  }, {
    label: 'Delete',
    icon:'fa fa-trash',command: (event) => {
      //event.originalEvent: Browser event
      //event.item: menuitem metadata
      this.display = true;

    }

  },

  {
    label: 'Export',
    icon: 'fa-download',command: (event) => {
 
   // FileSaver.saveAs(blob, "Export.csv"); 

     var csvData = this.ConvertToCSV(this.rates);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'SampleExport.csv';
    a.click();
      //event.originalEvent: Browser event
      //event.item: menuitem metadata
    }

  },
  {
    label: 'See more',
    icon: 'fa-info',command: (event) => {
      //event.originalEvent: Browser event
      //event.item: menuitem metadata
      // console.log("wierd"+JSON.stringify(item));
      //console.log("wierd  "+JSON.stringify(this.resultShared.getItem()));
      this.router.navigate(['tests/results']);

    }

  }];
}



delete(event){
  let errorBool=false;
  console.log(" what is heppening "+ this.selectedResults.length);
     if(this.selectedResults.createdBy!=this.itMe)
    {
      errorBool=true;
    }
     
  console.log(" what is heppening out "+this.deleteError);
  if(errorBool==false)
  {
       this.resultsService.deleteResult(this.selectedResults._id);
               this.selectedResults={};

      this.getResults();
 
  }
  else
  {
    this.selectedResults={};
    this.deleteError=true;
  }
  this.load=false;
  setTimeout(() =>this.load= true, 0);
   this.display = false;

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
getResults()
{
  this.resultsService.getResults().finally(() => {
    console.log("wierd  lenght "+this.results.length);

    for(var i=0;i<this.results.length;i++)
    {
      var b={_id:"",type:"",modality:"",time:'',createdAt:"",createdBy:"",fail:false,publicResults:false};
      b._id= this.results[i]._id;
      console.log("wierd "+i+" "+this.results[i]._id);
      b.modality= this.results[i].modality;
      b.createdAt= this.datepipe.transform(this.results[i].createdAt, 'medium');
      b.createdBy= this.results[i].createdBy;
     


      if(!this.results[i].complete)
      {
        b.type= "Sub process";
      }
      else
      {
        b.type= this.results[i].type;
      }
      b.fail= this.results[i].fail;
       b.publicResults=this.results[i].publicResults;
      var tt:number=0.0;
      if(this.results[i].errorTime!=null)
      {
        var t1=this.results[i].errorTime;
          tt=t1;
      }
      if(this.results[i].timesPretrait!=null && this.results[i].timesMatching!=null )
      {

        var t1=this.results[i].timesPretrait.totalPretrait;
        var t2=this.results[i].timesMatching.totalMatching;
        tt=t1+t2;

      }
      else
      {
        if(this.results[i].timesPretrait!=null )
        {
          var t1=this.results[i].timesPretrait.totalPretrait;
          tt=t1;

        }
        if( this.results[i].timesMatching!=null )

        {
          var t2=this.results[i].timesMatching.totalMatching;
          tt=t2;

        }

      }


    /*  var time= Math.round(tt*100)/100;    
      if(time>60)
      {
                       b.time =time+" s"; 

             // b.time =time%60+" mins "+(time-time%60)*60+" s"; 

      }
      else
      {
              b.time =time+" s"; 
      }*/
      var finalTime = this.fancyTimeFormat(tt);
         b.time=finalTime;
      this.resultsModified[i]=b;
      //Array.prototype.push.apply( this.resultsModified,b);
      //      console.log("wierd a  b "+ JSON.stringify(this.resultsModified[i]));


    }
    console.log("wierd a  b "+  this.resultsModified.length);

    this.load=false;
    setTimeout(() =>this.load= true, 0);

  })
  .subscribe(
    result => this.results = result,

    error => this.errorMessage = <any>error);
}
   fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + " H " + (mins < 10 ? "0" : "");
    }
  if (mins > 0) {
    ret += "" + mins + " m " + (secs < 10 ? "0" : "");
    }
    ret += "" + (Math.round(secs*100)/100) +" s" ;
    console.log("w time "+ret);
    return ret;
}
create(event)
{
  this.router.navigate(['tests/']);

}
onSelect(item:any)
{
  this.first=false;
  this.item=this.searchbyId(item.data._id);
 //alert("olla   "+JSON.stringify(this.item));

  this.resultShared.setItem( this.item);
  this.rates[0].missrate=this.item.missrate;
  this.rates[0].realrate=this.item.realrate;
  this.rates[0]=this.item.rates;
//alert("olla"+JSON.stringify(this.rates));
  this.fail=false;
  this.complete=false;
  setTimeout(() =>this.complete= this.item.complete, 0);
  setTimeout(() =>this.fail= this.item.fail, 0);
  var toUpdate={publicResults:!this.item.publicResults,_id:this.item._id};
  this.resultsService.updateResults(toUpdate);
  if(this.item.publicResults)
  {
    this.items2[0].icon="fa-eye";
  }
  else
  {
    this.items2[0].icon="fa-eye-slash";

  }
      //  this.done=false;
      //setTimeout(() => this.done = true, 0);
      this.fail=this.item.fail;
      this.complete= this.item.complete;
      // this.timesPretrait=this.item.infos.timesPretrait;
      //this.files=this.item.files;
      
    //           console.log(" wooooooow "+ JSON.stringify(this.item));
          
      if(!this.fail)
      {
        this.totalPretrait=this.item.timesPretrait.totalPretrait;
        this.avaragePretrait=this.item.timesPretrait.avaragePretrait;

        if(this.complete)
        {
         this.EER_er=this.item.rates.EER_er;
 
          this.avarageMatching=this.item.timesMatching.avarageMatching;
          this.totalMatching=this.item.timesMatching.totalMatching;
   
        }
     }

      setTimeout(() =>this.complete= this.item.complete, 0);
      setTimeout(() =>this.fail= this.item.fail, 0);
    
  //this.getResults();

  this.updateMenu=false;
  setTimeout(() =>this.updateMenu=true, 0);
  //alert("olla"+JSON.stringify(this.item));
}

selectResult(item:any) {

  this.resultShared.setItem(item);
  console.log("wierd"+JSON.stringify(item));
  console.log(JSON.stringify(this.resultShared.getItem()));

  //this.router.navigate(['results/show']);

}
searchbyId(id)
{

  for(var i=0;i<this.results.length;i++)
  {

    if(this.results[i]._id==id)
    {

      return this.results[i];
    }
  }
}
}
