import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions,ResponseContentType} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { AppConfig } from '../app.config';
import { TestModel } from '../models/Test';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class TestsService {
  constructor(private http:Http, private config: AppConfig,private authenticationService:AuthenticationService) { }
  results:any;

  getImage(imageUrl: string): Observable<Blob> {
    return this.http
    .get(imageUrl, { responseType: ResponseContentType.Blob })
    .map((res: Response) => res.blob());
  }
  getResult()
  {
   

    return this.results;
  }
  private extractData(res:Response) {
    let body = res.json();
    return body || [];
  }
  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  // Uses http.get() to load a single JSON file
  getTests(): Observable<TestModel[]>
  {
    return   this.http.get(this.config.apiUrl + '/tests/'+this.authenticationService.getEmail()).map(this.extractData).catch(this.handleError);
  }
   getTestById(id:Number): Observable<TestModel>
  {//5991e90e64470013e8c55a0d//59909bad3b968a13e00d2366//5991e90e64470013e8c55a0d//5994ce0e4ec707135c72b0b0
    return   this.http.get(this.config.apiUrl + '/tests/'+id).map(this.extractData).catch(this.handleError);
  }
  getResultById(id:Number): Observable<any>
  {//5991e90e64470013e8c55a0d//59909bad3b968a13e00d2366//5991e90e64470013e8c55a0d//5994ce0e4ec707135c72b0b0
    return   this.http.get(this.config.apiUrl + '/results/'+id).map(this.extractData).catch(this.handleError);
  }
  getFiles(url): Observable<any>
  {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    var body={"url":url};
    return this.http.post(this.config.apiUrl + '/results/', url, options); 

  }

  getResults(): Observable<any[]>
  {
    console.log("i am in results");
    return   this.http.get(this.config.apiUrl + '/results/user/'+this.authenticationService.getEmail()).map(this.extractData).catch(this.handleError);
  }
    createTestFusion(Test: TestModel){  
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(Test);
    return this.http.post(this.config.apiUrl + '/tests/fusion', body, options); // ...using post request
                         /*.map(res => {this.results=res.json(); console.log(' heeeeeeey '+JSON.stringify(res.json()));}) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw('Server error')) //...errors if
                         .subscribe();*/
                       }
  createTest(Test: TestModel){  
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(Test);
    return this.http.post(this.config.apiUrl + '/tests/', body, options); // ...using post request
                         /*.map(res => {this.results=res.json(); console.log(' heeeeeeey '+JSON.stringify(res.json()));}) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw('Server error')) //...errors if
                         .subscribe();*/
                       }
                       updateResults(bodyTo:any) {

                         const headers = new Headers({ 'Content-Type': 'application/json' });
                         const options = new RequestOptions({ headers: headers });
                         const body = JSON.stringify(bodyTo);
                         return this.http.put(this.config.apiUrl + '/results/' + bodyTo._id,bodyTo,options) // ...using post request
                         .map(res => {this.results=res.json(); console.log(' heeeeeeey '+res.json());}) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
                         .subscribe();
                       }
                       deleteTest(Test: TestModel) {
                         const headers = new Headers({ 'Content-Type': 'application/json' });
                         const options = new RequestOptions({ headers: headers });

                         const body = JSON.stringify(Test);
                         return this.http.delete(this.config.apiUrl + '/tests/' + Test._id,options) // ...using post request
                         .map(res => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
                         .subscribe();
                       }
                       deleteResult(id) {
                         const headers = new Headers({ 'Content-Type': 'application/json' });
                         const options = new RequestOptions({ headers: headers });

                          return this.http.delete(this.config.apiUrl + '/results/' + id,options) // ...using post request
                         .map(res => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
                         .subscribe();
                       }
                     }