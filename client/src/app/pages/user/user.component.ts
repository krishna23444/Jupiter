import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators,NgForm} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {UserService } from '../../services/index';
import { NgUploaderOptions } from 'ngx-uploader';
import {User} from '../../models/index';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  {
  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,private userService: UserService,private router: Router) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]},
       {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')}
    );

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.repeatPassword = this.form.controls['repeatPassword'];
  }
   public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };
  public onSubmit(model: User):void
  {


   if (this.form.valid) {
   delete model['repeatPassword'];

        console.log(model);

        this.userService.create(model).subscribe(
                                                            data => {
this.router.navigate(['/login']);
                                                            },
                                                            error => {

                                                            });;
      }
  }
}
