import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/operator/catch';
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";

/*
  Generated class for the DishProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LeaderService {

  constructor(public http: Http,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
                    // .map(res => { return this.processHTTPMsgService.extractData(res); })
                    // .catch(error => { return this.processHTTPMsgService.handleError(error); });
                    .pipe(map(res => { return this.processHTTPMsgService.extractData(res); }),
                    catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }

  getLeader(id: number): Observable<Leader> {
    return  this.http.get(baseURL + 'leaders/'+ id)
                     .pipe(map(res => { return this.processHTTPMsgService.extractData(res); }),
                     catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
                    .pipe(map(res => { return this.processHTTPMsgService.extractData(res)[0]; }),
                    catchError(error => { return this.processHTTPMsgService.handleError(error); }));
  }

}
