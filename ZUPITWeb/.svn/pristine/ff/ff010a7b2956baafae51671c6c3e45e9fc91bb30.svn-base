import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { APP_CONFIG } from 'app/app.config';
import { IAppConfig } from 'app/iapp.config';
declare var jQuery: any;

@Injectable()
export class MenuService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }

  private _serverError(err: any) {
    console.log('sever error:', err);
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }


  public getMenuItems() {
    return this.http.get(`${this.config.apiEndpoint}/getMenuItems`)
      .map(res => res.json().items)
      .catch(this._serverError);
  }

}
