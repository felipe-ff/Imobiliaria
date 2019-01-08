import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subscriber } from '../../model/subscriber.model';
import { CdrService } from '../../service/cdr.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { UtilityService } from '../../service/utility.service';
import { ShowView } from '../../model/show-view.enum';

@Component({
  selector: 'app-list-cdr-subscriber',
  templateUrl: './list-cdr-subscriber.component.html',
  styleUrls: ['./list-cdr-subscriber.component.css']
})
export class ListCdrSubscriberComponent implements OnInit {

  cdrs: Subscriber[];
  cols: any[];
  totalRecords: number;
  entityId: number;
  filter: any;

  cdrsExport: Subscriber[];
  colsExport: any[];

  ShowViewEnum = ShowView;

  tableWidth = this.calcWidth();

  loading = false;

  @ViewChild('dts') dataTable: DataTable;
  @ViewChild('exportDts') exportDts: DataTable;

  constructor(private cdrService: CdrService, private df: ChangeDetectorRef,
            private util: UtilityService) { }

  ngOnInit() {
  }

  init(subscriber, filter) {
    this.entityId = subscriber;
    this.filter = filter;
    this.loadTable('0', '13');
  }

  loadCdrsLazy(event: any) {
    if (this.entityId) {
      this.loadTable((event.first / event.rows) + '', event.rows + '');
    }
  }

  loadTable(page: string, size: string) {
    this.loading = true;
    this.df.detectChanges();
    this.cdrService.getSubscribers(this.entityId + '', this.filter, page, size)
      .subscribe( data => {
        this.totalRecords = data.totalElements;
        this.cdrs = data.content;
        this.cdrs.forEach(cdr => {
          this.cols = [
            { type: 'button', header: '', width: '56px'},
            { field: 'subscriber', header: 'C#', type: 'number', width: '130px'},
            { field: 'callStart', header: 'Ínicio Chamada', type: 'number', width: '120px' },
            { field: 'callEnd', header: 'Fim Chamada', type: 'number', width: '120px' },
            { field: 'cdrIndex', header: 'Duração', type: 'time', width: '100px' },
            { field: 'cdrIndex', header: 'Valor', type: 'currency', width: '100px' },
            { field: 'fromNumber', header: 'Origem', type: 'number', width: '145px'},
            { field: 'toNumber', header: 'Destino', type: 'number', width: '145px' },
            { field: 'timeKey', header: 'Data/Hora Carga', type: 'date', width: '180px'},
            { field: 'chargeTime', header: 'Tempo Carga', type: 'number', width: '110px'},
          ];
        });
        this.loading = false;
      });
  }

  loadExportTable() {
    this.loading = true;
    this.df.detectChanges();
    this.cdrService.getSubscribersAll(this.entityId + '', this.filter)
      .subscribe( data => {
        this.cdrsExport = data;
        this.cdrsExport.forEach(cdr => {
          this.colsExport = [
            { type: 'button', header: '', width: '56px'},
            { field: 'subscriber', header: 'C#', type: 'number', width: '130px'},
            { field: 'callStart', header: 'Ínicio Chamada', type: 'number', width: '120px' },
            { field: 'callEnd', header: 'Fim Chamada', type: 'number', width: '120px' },
            { field: 'duration', header: 'Duração', type: 'time', width: '100px' },
            { field: 'charge', header: 'Valor', type: 'currency', width: '100px' },
            { field: 'fromNumber', header: 'Origem', type: 'number', width: '145px'},
            { field: 'toNumber', header: 'Destino', type: 'number', width: '145px' },
            { field: 'timeKey', header: 'Data/Hora Carga', type: 'date', width: '180px'},
            { field: 'chargeTime', header: 'Tempo Carga', type: 'number', width: '110px'},
          ];
        });
        this.loading = false;
        setTimeout(() => {
          this.formatData(this.cdrsExport);
          this.exportDts.exportCSV();
        }, 500);
      });
  }

  formatData(data: any) {
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] != null) {
        data[key].timeKey = this.util.convert(data[key].timeKey, 'date');
        data[key].charge = data[key].cdrIndex.charge;
        data[key].duration = data[key].cdrIndex.duration;
      }
    }
  }

  convert(value: any, type: any) {
    if (value == null) {
      return '';
    }
    if (type === 'time') {
      value = value.duration;
    } else if (type === 'currency') {
      value = value.charge;
    }
    return this.util.convert(value, type);
  }

  calcWidth() {
    return  ( (window.innerWidth - 30) >= 1280 ? (window.innerWidth - 30) : 1280) + 'px';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.tableWidth =  this.calcWidth();
  }

  goToDetailSpecifPage(cdr: Subscriber) {
    this.util.changeView.emit(ShowView.specificDetail);
  }

  goToCdrChartPage() {
    this.util.changeView.emit(ShowView.chart);
  }

  backToList(): void {
    this.dataTable.reset();
    this.util.changeView.emit(ShowView.table);
  }

}
