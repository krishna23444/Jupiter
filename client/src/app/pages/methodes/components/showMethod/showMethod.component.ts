import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgSwitchModule } from 'ng2-switch';
import { CodemirrorComponent }      from 'ng2-codemirror';
import { MethodModel } from '../../../../models/method';
import { AppConfig } from '../../../../app.config';
import 'codemirror/mode/octave/octave'; // import mode
import { MethodesComponent } from '../../methodes.component';
import { MethodeShared } from '../../methodeShared.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { User } from '../../../../models/user';
import * as FileSaver from 'file-saver';

@Component({
  moduleId: module.id,
  selector: 'app-showMethod',
  templateUrl: './showMethod.component.html',
  styleUrls: ['./showMethod.component.scss'],
  providers: []

})

export class ShowMethodComponent implements OnInit   {
  method: MethodModel;
  public itIsMe:boolean=true;
 // public modules: any[];//liste of modules
  public octaveConfig:any ;
  user:User;
  code="";
  modules:any[]=["Normalisation","Segmentation","Filtering","Binarisation","Thining","Extraction","Matching"];
  constructor(public methodeShared: MethodeShared,private authenticationService:AuthenticationService,private router: Router, 
    private route: ActivatedRoute) {


  }
  public ngOnInit() {

    this.method=this.methodeShared.getItem();
    this.itIsMe=(this.authenticationService.getEmail()== this.method.createdBy);
  //  console.log('stupid '+this.method.codeMatlab);
    this.octaveConfig={
      lineNumbers: true,
      mode: 'octave',
      theme:'mdn-like',
      value:this.method.codeMatlab,
      readOnly:"nocursor"
    };
    this.code=this.method.codeMatlab;
  }


  goList()
  {
        this.router.navigate(['methods/']);

  }
  download()
  {
    console.log("heeeeeeeee");
    let blob = new Blob([this.method.codeMatlab], {
            type: "text/plain"
        });
    FileSaver.saveAs(blob, this.method.name+".m");  
  }
  
} 