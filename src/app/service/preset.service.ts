import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { Preset } from '../model/preset.model';

@Injectable()
export class PresetService {

  constructor(public location: Location, private http: HttpClient) {
    this.setLocation();
  }

  baseUrl;

  setLocation() {
    const port = isDevMode() ? '8123' : location.port;

    this.baseUrl = 'http://localhost:' + port + '/hpe/searches';
  }

  getPresets() {
    return this.http.get<Preset[]>(this.baseUrl);
  }

  getPresetById(id: number) {
    return this.http.get<Preset>(this.baseUrl + '/' + id);
  }

  createPreset(preset: Preset) {
    return this.http.post(this.baseUrl, preset);
  }

  updatePreset(preset: Preset) {
    return this.http.put(this.baseUrl, preset);
  }

  deletePreset(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
