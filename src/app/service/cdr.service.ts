import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cdr } from '../model/cdr.model';
import { isDevMode } from '@angular/core';

@Injectable()
export class CdrService {

  constructor(private http: HttpClient) {
    this.setLocation();
  }

  baseUrl;

  setLocation() {
    const port = isDevMode() ? '8123' : location.port;

    this.baseUrl = 'http://localhost:' + port + '/hpe/cdrs';
  }

  getCdrs() {
    return this.http.get<any>(this.baseUrl);
  }

  getCdrsWithPaging(filter: any, page: string, size: string) {
    /*.set('sort', 'duration').set('duration.dir', 'desc')*/
    const params = this.setDefaultFilters(filter, {name: 'subscriber', value: filter.subscriber}, page, size);
    return this.http.get<any>(this.baseUrl, {params});
  }

  getSubscribers(entityId: string, filter: any, page: string, size: string) {
    const params = this.setDefaultFilters(filter, {name: 'entityId', value: entityId}, page, size);
    return this.http.get<any>(this.baseUrl + '/entity', {params});
  }

  getSubscribersAll(entityId: string, filter: any) {
    const params = this.setDefaultFilters(filter, {name: 'entityId', value: entityId}, null, null);
    return this.http.get<any>(this.baseUrl + '/entity/all', {params});
  }

  getDestinationChart(entityId: string, filter: any) {
    const params = this.setDefaultFilters(filter, {name: 'entityId', value: entityId}, null, null);
    return this.http.get<any>(this.baseUrl + '/chart/destination', {params});
  }

  getTotalValueChart(entityId: string, filter: any) {
    const params = this.setDefaultFilters(filter, {name: 'entityId', value: entityId}, null, null);
    return this.http.get<any>(this.baseUrl + '/chart/totalValue', {params});
  }

  getCdrChart(entityId: string, filter: any) {
    const params = this.setDefaultFilters(filter, {name: 'entityId', value: entityId}, null, null);
    return this.http.get<any>(this.baseUrl + '/chart/cdrs', {params});
  }

  getCdrsByFilter(obj: Cdr) {
    return this.http.get<Cdr[]>(this.baseUrl); /*  + '/' + obj */
  }

  getCdrById(id: number) {
    return this.http.get<Cdr>(this.baseUrl + '/' + id);
  }

  setDefaultFilters(filter, objId, page, size) {
    const params = new HttpParams()
      .set('page', page || '')
      .set('size', size || '')
      .set(objId.name, objId.value)
      .set('startDatetime', filter.startDatetime || '')
      .set('endDatetime', filter.endDatetime || '')
      .set('minDuration', filter.minDuration || '')
      .set('maxDuration', filter.maxDuration || '')
      .set('minValue', filter.minValue || '')
      .set('maxValue', filter.maxValue || '')
      .set('fromNumber', filter.fromNumber || '')
      .set('toNumber', filter.toNumber || '')
      .set('callQueryType', filter.callQueryType.code || '');
    return params;
  }
}
