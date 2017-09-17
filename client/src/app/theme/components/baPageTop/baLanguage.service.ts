import {Injectable} from '@angular/core'

@Injectable()
export class BaLanguageService {

  private _languages = [
    {
      name: 'Fr',
      text: 'Français',
    image:'assets/img/fr-flag.svg'
    },
     {
      name: 'En',
      text: 'English',
    image:'assets/img/uk-flag.svg'
    }
     
  ];



  public getLanguages():Array<Object> {
    return this._languages;
  }
}
