import { Component, OnInit, Input } from '@angular/core';
import { PresetService } from '../service/preset.service';
import { DatePipe } from '@angular/common';
import { Preset } from '../model/preset.model';
import { UtilityService } from '../service/utility.service';
import { CdrTypes } from '../model/cdr-types.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-list-preset',
  templateUrl: './list-preset.component.html',
  styleUrls: ['./list-preset.component.css']
})
export class ListPresetComponent implements OnInit {

  presetName;
  presetId;
  presets: Preset[];
  colsPreset: any[];
  totalPresets: number;
  selectedPreset: Preset;
  appliedPreset: Preset;
  loadingPreset = false;
  lockDelete = false;

  @Input() searchCdrForm: any;

  flagGroup = ['Fixo/desconhecido', 'Móvel', 'Fixo/desconhecido', 'Móvel', 'Destino nacional', 'Destino internacional',
                      'Roaming origem', 'Roaming destino', 'Chamada pré-paga', 'Chamada pós-paga', 'Chamada a cobrar', 'TUP', 'ISDN'];

  constructor(private util: UtilityService, private presetService: PresetService) { }

  ngOnInit() {
  }

  init() {
    this.selectedPreset = null;
    this.loadPresets();
  }

  loadPresets() {
    this.loadingPreset = true;
    this.presetService.getPresets().subscribe( data => {
      this.totalPresets = data.length;
      this.presets = data;
      this.presets.forEach(cdr => {
        this.colsPreset = [
          { field: 'id', header: '', type: 'id', width: ''},
          { field: 'name', header: 'Nome', width: '285px'},
          { type: 'button', header: '', width: '56px'}
        ];
      });
      this.loadingPreset = false;
      this.lockDelete = false;
      this.util.centerDialog.emit();
    });
  }

  applyPreset() {
    if (this.selectedPreset) {
      this.util.closePresetDialog.emit();
      this.appliedPreset = Object.assign({}, this.selectedPreset);
      this.presetId = this.appliedPreset.id;
      const flagsArray = this.appliedPreset.flagGroup ? JSON.parse('[' + this.appliedPreset.flagGroup + ']') : null;
      this.searchCdrForm.setValue({
        subscriber: this.appliedPreset.subscriber,
        startDatetime: this.appliedPreset.startDatetime ? new Date (this.appliedPreset.startDatetime * 1000) : '',
        endDatetime: this.appliedPreset.endDatetime ? new Date (this.appliedPreset.endDatetime * 1000) : '',
        loadStartDatetime: this.appliedPreset.loadStartDatetime ? new Date (this.appliedPreset.loadStartDatetime * 1000) : '',
        loadEndDatetime: this.appliedPreset.loadEndDatetime ? new Date (this.appliedPreset.loadEndDatetime * 1000) : '',
        startHour: this.appliedPreset.startHour,
        endHour: this.appliedPreset.endHour,
        minValue: this.appliedPreset.minValue,
        maxValue: this.appliedPreset.maxValue,
        minDuration: this.appliedPreset.minDuration,
        maxDuration: this.appliedPreset.maxDuration,
        fromNumber: this.appliedPreset.fromNumber,
        toNumber: this.appliedPreset.toNumber,
        numberInputRoute: this.appliedPreset.numberInputRoute,
        numberOutputRoute: this.appliedPreset.numberOutputRoute,
        flagGroup: flagsArray ? flagsArray : this.flagGroup.map(x => [].indexOf(x) > -1),
        typeDuration: {name: this.fetchType(this.appliedPreset.typeDuration), code: this.appliedPreset.typeDuration},
        typeValue: {name: this.fetchType(this.appliedPreset.typeValue), code: this.appliedPreset.typeValue},
        callQueryType: {name: this.fetchType(this.appliedPreset.callQueryType), code: this.appliedPreset.callQueryType},
        eotA: this.appliedPreset.eotA,
        trunkInput: this.appliedPreset.trunkInput,
        trunkOutput: this.appliedPreset.trunkOutput,
        tton: this.appliedPreset.tton,
        eotInputRoute: this.appliedPreset.eotInputRoute,
        eotANotEqualEotInputRoute: this.appliedPreset.eotANotEqualEotInputRoute,
        groupingType: this.appliedPreset.groupingType
      });
      this.util.toastr.successToastr('Preset aplicado com sucesso!');
    } else {
      this.util.toastr.errorToastr('Selecione um preset');
    }
  }

  hasPresets() { return (this.presets && this.presets.length > 0) ? null : 'disabled'; }

  cancelPreset() {
    this.selectedPreset = Object.assign({}, this.appliedPreset);
  }

  savePreset() {
    const now = new DatePipe('en-US').transform( new Date().getTime(), 'dd/MM/yyyy HH:mm:ss:SSS');
    const name = this.appliedPreset ? this.appliedPreset.name : 'Preset - ' + now;

    this.doSavePreset(this.presetId, name);
  }

  savePresetAs(presetNameSaveAs, callback) {
    if (presetNameSaveAs) {
      this.doSavePreset(null, presetNameSaveAs);
      callback(true);
    } else {
      callback(false);
      this.util.toastr.errorToastr('Selecione um nome', 'Campos Inválidos!');
    }
  }

  doSavePreset(id, name) {
    const preset = Object.assign({}, this.searchCdrForm.value);
    preset.id = id;
    preset.name = name;
    preset.flagGroup = preset.flagGroup.toString();
    preset.startDatetime = preset.startDatetime ? preset.startDatetime.getTime() / 1000 : null;
    preset.endDatetime = preset.endDatetime ? preset.endDatetime.getTime() / 1000 : null;
    preset.loadStartDatetime = preset.loadStartDatetime ? preset.loadStartDatetime.getTime() / 1000 : null;
    preset.loadEndDatetime = preset.loadEndDatetime ? preset.loadEndDatetime.getTime() / 1000 : null;
    preset.callQueryType = preset.callQueryType.code;
    preset.typeDuration = preset.typeDuration.code;
    preset.typeValue = preset.typeValue.code;

    if (!preset.id) {
      this.presetService.createPreset(preset).subscribe( data => {
        this.util.toastr.successToastr('Salvo com sucesso!');
        this.presetId = data['id'];
        this.presetName = name;
      });
    } else {
      this.presetService.updatePreset(preset).subscribe( data => {
        this.util.toastr.successToastr('Atualizado com sucesso!');
        this.presetName = name;
      });
    }
  }

  deletePreset(p: Preset) {
    if (!this.lockDelete) {
      this.lockDelete = true;
      this.presetService.deletePreset(p.id).subscribe( data => {
          if (p.id === this.presetId) {
            this.presetId = null;
          }
          this.loadPresets();
      });
    }
  }

  fetchType(key) {
    switch (CdrTypes[key]) {
      case 'CDR':
        return 'CDR';
      case 'GROUPING':
        return 'Agrupamento';
      case 'CHAMADA':
        return 'Chamada';
      case 'CDR_PROCESSADO':
        return 'Processamento do CDR';
      default:
        return '';
    }
  }

  /* loadPresetsLazy(event: any) {
    if (this.showView === ShowView.table) {
      this.loadPresets();
    }
  } */

}
