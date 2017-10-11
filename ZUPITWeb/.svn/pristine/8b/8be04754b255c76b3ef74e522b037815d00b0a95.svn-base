import { Injectable, Inject } from '@angular/core';
import { Http, Response, Request, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';
import { SampleType } from '../domain/sampletype';
import { APP_CONFIG } from 'app/app.config';
import { IAppConfig } from 'app/iapp.config';
declare var jQuery: any;

@Injectable()
export class SampleTypeService {

  constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }

  private _serverError(err: any) {
    console.log('sever error:', err);
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }


  public getSampleTypes() {
    return this.http.get(`${this.config.apiEndpoint}/getAllMock`)
      .map(this.extractData)
      .do(data => console.log('server data:', data))
      .catch(this._serverError);
  }

  public getSampleType(id: number) {
    return this.http.get(`${this.config.apiEndpoint}/getSampleType/${id}`)
      .map(res => res.json().data)
      .do(data => console.log('server data:', data))
      .catch(this._serverError);
  }

  private extractData(res: Response) {
    let data = res.json();
    let columnData = [];
    let columnActions = [];

    data.columnConfig.columns.forEach(column => {
      // Get column definition/attributes element from array of objects
      let colAtts = jQuery.grep(data.attributes, function (attr) { return attr.name === column; });
      if (colAtts.length === 1) {
        colAtts = colAtts[0];
        let columnElement = { field: colAtts.name, header: colAtts.displayName, type: colAtts.type };
        if (data.columnConfig.sortable.indexOf(column) > -1) {
          columnElement['sortable'] = true;
        } else {
          columnElement['sortable'] = false;
        }
        if (data.columnConfig.searchable.indexOf(column) > -1) {
          columnElement['filter'] = true;
          columnElement['filterMatchMode'] = 'contains';
          columnElement['filterPlaceholder'] = 'Traži';
        }
        columnData.push(columnElement);
      }
    });

    data.actions.forEach(action => {
      if (action.target === 'LIST_ITEM') {
        columnActions.push({ label: action.description, type: action.id });
      }
    });

    data.columnData = columnData;
    data.columnActions = columnActions;
    return data;
  }

  public deleteSampleType(sampleType: SampleType) {
    console.log('Brišem sample type: ' + sampleType.id);
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(sampleType);

    return this.http.post(`${this.config.apiEndpoint}/delete`, body, options)
      .map(res => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError);
  }

  public saveSampleType(sampleType: SampleType) {
    console.log('Update sample type: ' + sampleType.id);
    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(sampleType);

    return this.http.post(`${this.config.apiEndpoint}/save`, body, options)
      .map(res => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError);
  }


}
