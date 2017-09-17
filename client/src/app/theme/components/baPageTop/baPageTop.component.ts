import {Component, OnInit} from '@angular/core';
import {GlobalState} from '../../../global.state';
import { Router } from '@angular/router';
import { User } from '../../../models/index';
import { AuthenticationService } from '../../../services/index';
import { AppConfig } from '../../../app.config';
import {BaLanguageService} from './baLanguage.service';
@Component({
   moduleId: module.id,
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
  providers: [AppConfig,BaLanguageService]
})   
export class BaPageTop implements OnInit {
 currentUser: User;
 name:String;
   public languages:Array<Object>;

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public logged:boolean =true;
  constructor(private _baLanguageService:BaLanguageService,private _state:GlobalState,private authenticationService: AuthenticationService,private router: Router) {
       this.languages = this._baLanguageService.getLanguages();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
    this.isMenuCollapsed = isCollapsed;
       this.logged=this.authenticationService.isLogged();

    });
        //    console.log('i am email'+this.authenticationService.getEmail().split('"')[1]);

    this.name=this.authenticationService.getEmail();

  }
ngOnInit() {
        // To get the status of the user , 

    }
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }
public logout()
{
    this.authenticationService.logout();
    this.router.navigate(['/login']);

}
public editUser()
{
      this.router.navigate(['user']);

}
public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
