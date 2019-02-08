import { Injectable, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Injectable()
export class UtilityService {

  loadDetailsList = new EventEmitter<Number>();
  closePresetDialog = new EventEmitter();
  centerDialog = new EventEmitter();
  fitToScreen = new EventEmitter();

  constructor(public toastr: ToastrManager) {}

  convertToComma(filter) {
    if (filter.minValue) { filter.minValue.replace(',', '.'); }
    if (filter.maxValue) {filter.maxValue.replace(',', '.'); }
  }

  concatAndconvertToUnix(date, hour, isEndDate) {
    if (date) {
      const mom = moment(date);
      if (hour != null) {
        mom.add(hour, 'hours');
        if (isEndDate) {
          mom.add(59, 'minutes');
          mom.add(59, 'seconds');
        }
      }
      return (mom.valueOf()) / 1000;
    }

    return '';
  }

  loadPtBrCalendar() {
    return {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
                    'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  convert(value, type) {
    if (type === 'date' && value) {
      const datePipe = new DatePipe('en-US');
      return datePipe.transform( (value * 1000), 'dd/MM/yyyy h:mm a');
    }
    if (type === 'time') {
      const totalNumberOfSeconds = value;
      const hours = Math.floor((totalNumberOfSeconds / 3600) );
      const minutes = Math.floor( (totalNumberOfSeconds - (hours * 3600)) / 60 );
      const seconds = Math.floor((totalNumberOfSeconds - ((hours * 3600) + (minutes * 60))));
      return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' +
             (seconds  < 10 ? '0' + seconds : seconds);
    }
    if (type === 'currency') {
      return ('R$ ' + value / 100).toString().replace('.', ','); /*transformar de centavos a reais */
    }

    return value;
  }

}
