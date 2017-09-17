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
  selector: 'app-processus',
  templateUrl: './processus.component.html',
  styleUrls: ['./processus.component.scss'],
})
export class ProcessusComponent implements OnInit {
  busy: Subscription;
  scan=0;
  pretMethods= 1; //number pf methodes
  public modules:any[]=[
  {"header":"Segmentation","order":1},
  {"header":"Normalisation","order":2},
  {"header":"Filtering","order":3},
  {"header":"Binarisation","order":4},
  {"header":"Thining","order":5}];
  needBDD=false;
  testComplete=true;
  toStr = JSON.stringify;
  public form:FormGroup;
  public submitted:boolean = false;
  msgs: any[] = [];
  public step=1;
  public process: any[] = [];
  active1="active"; active2=""; active3="";
  active4=""; active5=""; 
  previousClass=true;
  visibleTable: boolean = true;
  done: boolean = true;
  done2: boolean = true;
  nextClass=true;
  playClass=true;
  selectedMethod:any={};
  private databases:DatabsModel[] = [];
  methods:MethodModel[] = [];
  methodsExt:MethodModel[] = [];
  methodsMatch:MethodModel[] = [];
  categoriesExt:CategoryModel[]=[];
  categories:CategoryModel[]=[];
  categoriesMatch:CategoryModel[]=[];
  private item:DatabsModel;//=new DatabsModel('','','','','','','','','','','',false,false,'','');
  private errorMessage:any = '';
  public enhaceSteps=0;
  IndividualMax=0;
  cleaning=true;
  constructor(fb:FormBuilder,private router: Router, private databasesService: DatabasesService,private methodsService: MethodsService,private modalitiesService: ModalitiesService,private categoriesService: CategoriesService,
    private authenticationService:AuthenticationService,private testsService:TestsService, private resultShared:ResultShared) {
    this.form = fb.group({
      databaseForm: new FormGroup({
        modality: new FormControl('',Validators.required),
        database: new FormControl('',Validators.required),
        individuals: new FormControl('',Validators.required)
      }),
      pretraitForm: new FormGroup({
        submodules: new FormControl(''),
        methodeCatPretrait: new FormControl(''),
        methodePretrait: new FormControl('')
      }),
      extractForm: new FormGroup({
        methodeCatExtract: new FormControl(''),
        methodeExtract: new FormControl(''),
        extractClean: new FormControl(false)
      }),
      matchForm: new FormGroup({
        methodeCatMatch: new FormControl(''),
        methodeMatch: new FormControl(''),
      }), 
      resultForm: new FormGroup({
        saveImages: new FormControl(true),
        saveMark: new FormControl(true),
        savePraitTime: new FormControl(true),
        saveMatchTime: new FormControl(true),
        roc: new FormControl(true),
        saveScript: new FormControl(true)
      }),
      'createdBy' : [this.authenticationService.getEmail()],
    });
    this.databasesService.getDatabases()
    .subscribe(
      database => this.databases = database,
      error => this.errorMessage = <any>error);
  }
  ngOnInit() {
  }
  get pretraitForm(): any { return this.form.get('pretraitForm'); }
  get databaseForm(): any { return this.form.get('databaseForm.database'); }
  /********************************************Ctrls********************/
  getPreMethodMatch(category: string )
  {
    this.methodsService.getMethodsByCategory(category).finally(() => {   
      this.done2=false;
      setTimeout(() => this.done2 = true, 0);}).subscribe(
      methods =>{
        this.methodsMatch = methods; 
        // Do anything else with the `this.item` here.
      } ,
      error => this.errorMessage = <any>error);
      // // console.log(" i am methods "+JSON.stringify(this.methodsExt));
    }
    getPreMethodExt(category: string )
    {
      this.methodsService.getMethodsByCategory(category).finally(() => {   
        this.done2=false;
        setTimeout(() => this.done2 = true, 0);}).subscribe(
        methods =>{
          this.methodsExt = methods; 
          // Do anything else with the `this.item` here.
        } ,
        error => this.errorMessage = <any>error);
        // // console.log(" i am methods "+JSON.stringify(this.methodsExt));
      }
      getPreMethod(category: string )
      {
        this.methodsService.getMethodsByCategory(category).finally(() => {   
          this.done2=false;
          setTimeout(() => this.done2 = true, 0);}).subscribe(
          methods =>{
            this.methods = methods; 
            // Do anything else with the `this.item` here.
          } ,
          error => this.errorMessage = <any>error);
          //  // // console.log(" i am methods "+JSON.stringify(this.methods));
        }
        getCategory(module: string )
        {
          // // // console.log("2 "+module);
          this.categoriesService.getCategoriesByModule(module).finally(() => {   // // // console.log("2 "+JSON.stringify(this.categories));
            this.done=false;
            setTimeout(() => this.done = true, 0);
            this.done2=false;
            setTimeout(() => this.done2 = true, 0);
          }).subscribe(
          categories =>{
            this.categories = categories; 
            // Do anything else with the `this.item` here.
          } ,
          error => this.errorMessage = <any>error);
        }
        getDatabase(id: Number) // onclick of database 
        {
          this.databasesService.getDatabase(id).finally(() => { 
            this.deleteFrom(0);
            console.log("eeeeeeeeey 1"+JSON.stringify(this.item)+"hhhhhhhhhhh"+JSON.stringify(this.item[0]));  
            this.scan= this.item.numberScans;
            var x=this.item.numberTot/ this.item.numberScans; 
            //To change
            console.log("1 hey "+x);  
            (< FormGroup >this.form.controls['databaseForm']).controls['individuals'].patchValue(x);
            //this.form.controls['individuals'].setValue(x);
            this.IndividualMax=x;
            this.done2=false; //
            this.nextClass=true; 
            this.done=false;

            setTimeout(() => this.nextClass = false, 0);
            setTimeout(() => this.done2 = true, 0);
            setTimeout(() => this.done = true, 0);
          }).subscribe(
          database =>{
            this.item = database.infos; 
            // Do anything else with the `this.item` here.
          } ,
          error => this.errorMessage = <any>error);

        }
        getNextExt(methodsExt)
        {

          this.nextClass=false;
        }
        getNextMatch(methodsMatch)
        {
          this.nextClass=false;

        }
        onChange(Modality) {
          /***On change modality ***********/
          this.categoriesService.getCategoriesByModule("Extraction").finally(() => {   // // // console.log("2 "+JSON.stringify(this.categories));

        }).subscribe(
        categories =>{
          this.categoriesExt = categories; 
          // Do anything else with the `this.item` here.
        } ,
        error => this.errorMessage = <any>error);
        this.categoriesService.getCategoriesByModule("Matching").finally(() => {   // // // console.log("2 "+JSON.stringify(this.categories));

      }).subscribe(
      categories =>{
        this.categoriesMatch = categories; 

        // Do anything else with the `this.item` here.
      } ,
      error => this.errorMessage = <any>error);
      // // // console.log(Modality);
      this.databasesService.getDatabasesByModality(Modality) .finally(() => {
        console.log("url  : "+Modality);
        this.deleteFrom(0);
        this.done=false;
        setTimeout(() => this.done = true, 0);
        this.done2=false;
        setTimeout(() => this.done2 = true, 0); })
      .subscribe(
        database => this.databases = database,
        error => this.errorMessage = <any>error);
      /************/

      // this.getDatabase(  parseInt(this.databases[0]._id));

    }
    preClick()
    {

      this.pretMethods=this.pretMethods+1;
      var items= this.pretraitForm.value;
      this.visibleTable=false;
      setTimeout(() => this.visibleTable = true, 0);
      let order=this.searchModule(items.submodules);
      // // // console.log("Order "+order.order+"    "+this.searchOrder(order.order+1));
      if(this.searchOrder(order.order+1)!=0)
      {

        this.process[this.searchOrder(order.order+1)]={"order":order.order+1,"module":items.submodules,
        "category":  items.methodeCatPretrait
        ,"name": items.methodePretrait};    
      }
      else
      {
        this.process.push( Object.assign({},{"order":order.order+1,"module":items.submodules,
          "category":  items.methodeCatPretrait
          ,"name": items.methodePretrait}));    
      }
      this.process.sort(this.compare);
      this.nextClass=!(this.process.length==6); /*************************************************/
      // // // console.log("I am ok to test : "+this.okToTest());
      this.playClass=!this.okToTest();
      this.done=false;
      setTimeout(() => this.done = true, 0);
    }
    public next()
    {
      this.step=this.step+1;

      switch (this.step) {
        case 1:
        // code...
        this.active1="active"; this.active2=""; this.active3="";
        this.previousClass=true;
        this.nextClass=false;
        //playClass=true;
        this.active4=""; this.active5="";
        break;
        case 2:
        // // // console.log("i am step 2");
        this.active1=""; this.active2="active"; this.active3="";
        this.active4=""; this.active5="";
        this.visibleTable=false;
        setTimeout(() => this.visibleTable = true, 0);
        // // // console.log("3"+JsSON.stringify(this.item));
        var datta=this.item;
        // // // // console.log("Modality"+datta._id);
        this.previousClass=false;
        this.nextClass=true;
        if(this.process.length>=1)
        {
          this.process[0]=( Object.assign({},{"order":1,"module":"Database","category": datta.preTraited === true ? 
            "Pretraited database":"Not pretraited database"
            ,"name": datta.name}));  
          if(this.process.length>1)
          {
            this.nextClass=false;

          }
        }
        else
        {
          this.process.push( Object.assign({},{"order":1,"module":"Database","category": datta.preTraited === true ? 
            "Pretraited database":"Not pretraited database"
            ,"name": datta.name}));       
        }
        this.cleaning=!datta.preTraited;

        if(datta.preTraited==true)
        {

          this.step=  this.step+1;
          // // // console.log("i am step 4");
          /*****I am going to  extraction now ***************/

          //Show only the selected modality 
          // // console.log("i am before"+this.categoriesExt.length);
          this.categoriesExt=this.getMethodesModality(this.categoriesExt);
          this.categoriesMatch=this.getMethodesModality(this.categoriesMatch);

          this.active2=""; this.active3="active";  
        }
        this.process.sort(this.compare);



        // code...
        break;
        case 3:
        /*****I am going to  extraction now ***************/

        //Show only the selected modality 
        this.categoriesExt=this.getMethodesModality(this.categoriesExt)  ;
        this.categoriesMatch=this.getMethodesModality(this.categoriesMatch);

        this.active1=""; this.active2=""; this.active3="active";
        this.active4=""; this.active5="";
        
        // code...
        break;
        case 4:
        this.done2=false; //

        setTimeout(() => this.done2 = true, 0);
        this.done=false;
        setTimeout(() => this.done = true, 0);
        let ind=this.searchProcessModule("Extraction");
        this.selectedMethod=JSON.parse((< FormGroup >this.form.controls['extractForm']).controls['methodeExtract'].value);
        this.needBDD=this.selectedMethod.needBDD;
        let moduleExt="";
        this.active4="active"; this.active5="";

        if(this.needBDD==true)
        {    
          this.step=this.step+1;
          moduleExt="Extraction / Matching";
          this.active4=""; this.active5="active";
        this.process.sort(this.compare);

        this.visibleTable=false;
        setTimeout(() => this.visibleTable = true, 0);
        this.active1=""; this.active2=""; this.active3="";
        //previousClass=true;
        this.nextClass=true;
        this.playClass=true;
        setTimeout(() => this.playClass = false, 0);
        console.log(" I AM HELLLLLLLLLLLLLLLLLLLLL");
        //playClass=true;
        this.active4=""; this.active5="active";
        }
        else
        {
          this.needBDD=false;
          moduleExt="Extraction";
        }
        if(ind==0)
        {    

          this.process.push( Object.assign({},{"order":this.process.length+1,"module":moduleExt,"category":  (< FormGroup >this.form.controls['extractForm']).controls['methodeCatExtract'].value
            ,"name":  this.selectedMethod.name}));     
        }
        else
        {
          this.nextClass=false;

          this.process[ind]=( Object.assign({},{"order":this.process.length,"module":moduleExt,"category":  (< FormGroup >this.form.controls['extractForm']).controls['methodeCatExtract'].value
            ,"name": this.selectedMethod.name}));
        }
        this.process.sort(this.compare);

        this.visibleTable=false;
        setTimeout(() => this.visibleTable = true, 0);
        this.active1=""; this.active2=""; this.active3="";


        // code...
        break;
        case 5:
        this.done2=false; //

        setTimeout(() => this.done2 = true, 0);
        this.done=false;
        setTimeout(() => this.done = true, 0);
        ind=this.searchProcessModule("Matching");
        if(ind==0)
        {
          this.process.push( Object.assign({},{"order":this.process.length+1,"module":"Matching","category":  (< FormGroup >this.form.controls['matchForm']).controls['methodeCatMatch'].value
            ,"name":  (< FormGroup >this.form.controls['matchForm']).controls['methodeMatch'].value}));     
        }
        else
        {
          this.nextClass=false;

          this.process[ind]=( Object.assign({},{"order":this.process.length,"module":"Matching","category":  (< FormGroup >this.form.controls['matchForm']).controls['methodeCatMatch'].value
            ,"name":  (< FormGroup >this.form.controls['matchForm']).controls['methodeMatch'].value}));
        }
        this.process.sort(this.compare);

        this.visibleTable=false;
        setTimeout(() => this.visibleTable = true, 0);
        this.active1=""; this.active2=""; this.active3="";
        //previousClass=true;
        this.nextClass=true;
        this.playClass=true;
        setTimeout(() => this.playClass = false, 0);
        console.log(" I AM HELLLLLLLLLLLLLLLLLLLLL");
        //playClass=true;
        this.active4=""; this.active5="active";
        // code...
        break;

        default: 
        
        // code...
        break;
      }
      // // // console.log("heeeeee"+this.step);

    } 
    public previous()
    {
      this.step=this.step-1;
      switch (this.step) {
        case 1:
        // code...
        this.active1="active"; this.active2=""; this.active3="";
        this.previousClass=true;
        this.nextClass=false;
        //playClass=true;
        this.active4=""; this.active5="";
        this.visibleTable=false;
        setTimeout(() => this.visibleTable = true, 0);
        break;
        case 2:
        this.previousClass=false;
        this.nextClass=false;
        this.active1=""; this.active2="active"; this.active3="";
        this.active4=""; this.active5=""; 
        if(this.item.preTraited==true)
        {
          this.step=this.step-1;
          this.active1="active"; this.active2=""; this.active3="";
          this.active4=""; this.active5="";
          this.previousClass=true;
          this.nextClass=false; 
        }
        // code...
        break;
        case 3:
        this.active1=""; this.active2=""; this.active3="active";
        this.active4=""; this.active5="";
        // this.previousClass=true;
        this.nextClass=false; 
        // code...
        break;
        case 4:
        this.active1=""; this.active2=""; this.active3="";
        this.active4="active"; this.active5="";
        if( this.needBDD)
        {
          this.step--;
          this.active1=""; this.active2=""; this.active3="active";
          this.active4=""; this.active5="";
        }
        // code...
        break;
        case 5:
        this.active1=""; this.active2=""; this.active3="";
        //previousClass=true;
        this.nextClass=false;

        this.playClass=true;
        this.active4=""; this.active5="active";
        // code...
        break;

        default:
        // code...
        break;
      }

    }
    /*********************Helpers************/
    okToTest()
    {
      let numberMethods=this.process.length;
      let maxIn=this.process[numberMethods-1].order;
      // // console.log("i am inside OK : "+numberMethods+"  "+maxIn);
      if(numberMethods<maxIn)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    getMethodesModality(methodsList)
    {
      let modality= (< FormGroup >this.form.controls['databaseForm']).controls['modality'].value;
      // // console.log(" I am a modality + "+modality+methodsList.length);
      let saveArray: CategoryModel[] = [];
      for(var i=0;i < methodsList.length; i++)
      {
        // // console.log("test "+  JSON.stringify(methodsList[i].modality));
        if(modality==methodsList[i].modality)
        {
          saveArray.push(methodsList[i]);
        }
      }
      //// // console.log("Pleaaaaaaaaaaaaaase  "+ JSON.stringify( saveArray));


      return saveArray;

    }
    deleteFrom(index)
    {
      let saveArray: any[] = [];
      for(var i=0;i < index; i++)
      {
        saveArray.push(this.process[i]);
      }
      this.process=[];
      this.process=saveArray;

    }
    searchProcessModule(name)
    {
      for(var i = 0; i < this.process.length; i++)
      {
        // console.log("i am test i ahte you "+ this.process[i].module+"    name "+name);
        if (this.process[i].module.includes(name)) {
          return i;
        }

      }
      return 0;
    }
    searchModule(name)
    {
      for(var i = 0; i < this.modules.length; i++)
        if (this.modules[i].header == name) {
          return this.modules[i];
        }
        return 0;
      }
      searchOrder(order)
      {
        for(var i = 0; i < this.process.length; i++)
          if (this.process[i].order == order) {
            return i;
          }

          return 0;
        }
        compare(a,b) {
          if (a.order < b.order)
            return -1;
          if (a.order > b.order)
            return 1;
          return 0;
        }

        public onSubmit( ): void
        {

          let methodNames:any[]=[]; //Liste of methodes
          let createdBy=this.authenticationService.getEmail(); // user email
          let matcher="";
          let beforeRoutine="";
          let numberScans=this.item.numberScans;
          let numberTot=  (< FormGroup >this.form.controls['databaseForm']).controls['individuals'].value*numberScans;
          let savingResults=1;
          let modality=  (< FormGroup >this.form.controls['databaseForm']).controls['modality'].value;
          let url=this.item.url;
          let complete=false;
          /*****************THE REAL WORK STARTS HERE***************/
          //Get liste of modules 
          let max=this.process.length;
          if(this.process[this.process.length-1].module.includes("Matching"))
          {
            complete=true;
            max=max-1; //Means last one is MAtching
            matcher=this.process[this.process.length-1].name; // name of Matcher
            if(this.needBDD)
            {
              beforeRoutine=this.selectedMethod.name2;
            }
          }
          for(var i =1; i< max;i++)
          {
            methodNames[i-1]=this.process[i];
          }
          this.submitted = true;

          if (this.form.valid) {
            console.log("cilicke");
            // this.router.navigate(['tests/results']);           
            let test:TestModel=new  TestModel('',methodNames,complete,this.needBDD,createdBy,numberScans,numberTot
              ,savingResults,url,"Unimodal process",matcher,modality,beforeRoutine,'');
            this.busy =this.testsService.createTest(test).map(res =>
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


