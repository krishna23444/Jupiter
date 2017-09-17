import { Component, OnInit } from '@angular/core';
import { NgxTimelineModule } from 'ngx-timeline';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../../services/authentication.service';
import { AppConfig } from '../../app.config';

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {
	events: any[]=[];
	x=10;
	private errorMessage:any = '';
	constructor(private http:Http, private config: AppConfig,private authenticationService:AuthenticationService) { }

	ngOnInit() {
		var logs= this.http.get(this.config.apiUrl + '/logs/'+this.authenticationService.getEmail()).map(this.extractData)
		.catch(this.handleError);
		logs.subscribe(
			logat => {this.events = logat.slice(0,10);

			},
			error => this.errorMessage = <any>error);
		

	}
	private handleError(error:any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
	private extractData(res:Response) {
		let body = res.json();
		return body || [];
	}
	loadmore()
	{
		var logs= this.http.get(this.config.apiUrl + '/logs/'+this.authenticationService.getEmail()).map(this.extractData)
		.catch(this.handleError);
		logs.subscribe(
			logat => {this.events = logat.slice(0,this.x+10);
				this.x=this.x+10;
			},
			error => this.errorMessage = <any>error);
	}
}
