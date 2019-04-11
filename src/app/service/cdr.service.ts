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
  baseUrlApi;

  setLocation() {
    const port = isDevMode() ? '8081' : '';
    const url = isDevMode() ? 'http://localhost:' : 'https://imobiliaria-db.appspot.com';
    this.baseUrlApi = url + port + '/api/books';
    this.baseUrl = url + port;
  }

  getBooks(filters) {
    return this.http.get<any>(this.baseUrlApi + '/filters/' + filters + '/limit/' + 5 + '/offset/' + 0);
  }

  getBooksCount(filters) {
    return this.http.get<any>(this.baseUrlApi + '/filters/' + filters + '/limit/' + null + '/offset/' + 0);
  }

  login(user) {
    return this.http.post(this.baseUrlApi + '/login', user);
    //return this.http.get<any>(this.baseUrl + '/auth/login');
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseUrlApi + '/' + id);
  }

  getBookById(id: number) {
    return this.http.get<any>(this.baseUrlApi + '/' + id);
  }

  addBook(formData) {
    return this.http.post(this.baseUrlApi + '/add', formData);
  }

  updateBook(id, formData) {
    return this.http.put<any>(this.baseUrlApi + '/' + id, formData);
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
