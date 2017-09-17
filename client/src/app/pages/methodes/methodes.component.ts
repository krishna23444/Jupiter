import { Component, OnInit ,OnChanges } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MethodModel } from '../../models/method';
import { MethodsService } from '../../services/methods.service';
import { NgUploaderOptions } from 'ngx-uploader';
import { MethodeShared } from './methodeShared.service';
import { DataTableModule } from 'primeng/primeng';
import { AuthenticationService } from '../../services/authentication.service';
import {MessagesModule} from 'primeng/primeng';
//import { MethodeShared } from '../../methodeShared.service';


@Component({
  selector: 'app-methodes',
  templateUrl: './methodes.component.html',
  styleUrls: ['./methodes.component.scss'],
})
export class MethodesComponent implements OnInit   {
  returnUrl: string;
  error=false;
  deleteError=false;
  public done:boolean=true;

  private methods:MethodModel[] = [];
  selectedMethods:MethodModel[] = [];
  public itMe:String="";
  public item:MethodModel;//=new MethodModel('','','','','','','','','','',false,'','');
  private errorMessage:any = '';
  constructor(public methodeShared: MethodeShared,private methodsService: MethodsService,private router: Router, 
    private route: ActivatedRoute, private authenticationService:AuthenticationService) { 
    this.itMe=this.authenticationService.getEmail();
  setTimeout(() => this.methodsService.getMethods().finally(() => {  
      this.setIDone();
    })
    .subscribe(
      method => {this.methods = method;
      },

      error => this.errorMessage = <any>error), 1);
    console.log("I am constructor");
  }
refresh()
{
    setTimeout(() => this.methodsService.getMethods().finally(() => {  
      this.setIDone();
    })
    .subscribe(
      method => {this.methods = method;
      },

      error => this.errorMessage = <any>error), 0);
}
  ngOnInit() {
    console.log("I am inint")

    this.itMe=this.authenticationService.getEmail();

    //   this.router.navigate([this.returnUrl+'/create']);
    setTimeout(() => this.methodsService.getMethods().finally(() => {  
      this.setIDone();
    })
    .subscribe(
      method => {this.methods = method;
      },

      error => this.errorMessage = <any>error), 5);


   /* this.methodeShared.getEmittedValue().finally(() => {  
    })
    .subscribe(item =>{ this.done=item;
      console.log("trying before  "+ this.methods.length);
      this.methodsService.getMethods().finally(() => {   
        console.log("trying after "+ this.methods.length);
        this.selectedMethods=[];
        this.done=false;
        setTimeout(() => this.done = true, 0);
      })
      .subscribe(
        method => this.methods = method,
        error => this.errorMessage = <any>error);

      console.log("i am out change");
      this.done=false;
      setTimeout(() => this.done = true, 0);
    });*/

  }
  setIDone() {
    console.log("trying");
    this.done=false;
    setTimeout(() => this.done = true, 0);
  } 
  delete(event){
    let errorBool=false;
    this.deleteError=false;
    setTimeout(() => this.deleteError = false, 0);
    console.log(" what is heppening "+ this.selectedMethods.length);
    for (var i = 0; i < this.selectedMethods.length; i++) {
      console.log(" i am iiiin "+this.selectedMethods[i].createdBy+"          "+this.itMe);
      if(this.selectedMethods[i].createdBy!=this.itMe)
      {
        errorBool=true;
      }
    }     
    console.log(" what is heppening out "+this.deleteError);
    if(errorBool==false)
    {
      for (var i = 0; i < this.selectedMethods.length; i++) {
        this.methodsService.deleteMethod(this.selectedMethods[i]).finally(() => {   
          this.methodsService.getMethods().finally(() => {   
            this.selectedMethods=[];
            this.done=false;
            setTimeout(() => this.done = true, 0);
            
          })
          .subscribe(
            method => this.methods = method,
            error => this.errorMessage = <any>error);


        }).subscribe();
      }

    }
    else
    {
      this.selectedMethods=[];
      this.deleteError=true;
      setTimeout(() => this.deleteError = true, 0);

    }
    

  }
  create(event)
  {
    this.router.navigate(['methods/create']);

  }
  onSelect(item:MethodModel)
  {
    this.methodeShared.setItem(item);
  }

  selectMethod(item:MethodModel) {
    this.methodeShared.setItem(item);

    this.methodeShared.setUrl(item.url);
    console.log(JSON.stringify('why email is null  on select '+item.url));
    this.router.navigate(['methods/show']);
  }
  edittMethod(item:MethodModel) {
    this.error=false;

    if(this.itMe!=item.createdBy)
    {
      this.error=false;
      setTimeout(() => this.error = true, 0);

    }
    else
    {
      this.methodeShared.setItem(item);
      this.methodeShared.setUrl(item.url);


      this.router.navigate(['methods/edit']);
    }

  }
} 
