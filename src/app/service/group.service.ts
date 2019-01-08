import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Group } from '../model/group.model';
import { isDevMode } from '@angular/core';

@Injectable()
export class GroupService {

  constructor(public location: Location, private http: HttpClient) {
    this.setLocation();
  }

  baseUrl;

  setLocation() {
    const port = isDevMode() ? '8123' : location.port;

    this.baseUrl = 'http://localhost:' + port + '/hpe/terminalGroups';
  }

  getGroups() {
    return this.http.get<Group[]>(this.baseUrl);
  }

  getGroupById(id: number) {
    return this.http.get<Group>(this.baseUrl + '/' + id);
  }

  createGroup(group: Group) {
    return this.http.post(this.baseUrl, group);
  }

  updateGroup(group: Group) {
    return this.http.put(this.baseUrl, group);
  }

  deleteGroup(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
