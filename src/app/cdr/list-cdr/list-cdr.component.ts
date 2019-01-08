import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';
import { CdrService } from 'src/app/service/cdr.service';
import * as moment from 'moment';
import { Cdr } from 'src/app/model/cdr.model';
import { DataTable } from 'primeng/components/datatable/datatable';
import { SortEvent, LazyLoadEvent } from 'primeng/primeng';
import { ShowView } from 'src/app/model/show-view.enum';

@Component({
  selector: 'app-list-cdr',
  templateUrl: './list-cdr.component.html',
  styleUrls: ['./list-cdr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListCdrComponent implements OnInit {

  filter;
  startDatetime;
  endDatetime;

  startExecution;
  endExecution;
  calcDuration;

  cdrs: Cdr[];
  cols: any[];
  totalRecords: number;
  entityId: number;

  tableWidth =  this.calcWidth();

  loading = false;

  @ViewChild('dt') dataTable: DataTable;

  constructor(private util: UtilityService, private cdrService: CdrService,
    private df: ChangeDetectorRef) { }

  ngOnInit() {
  }

  searchCdrs(filter): void {
    this.startExecution = moment();
    this.filter = filter;
    this.startDatetime = filter.startDatetime * 1000;
    this.endDatetime = filter.endDatetime * 1000;
    this.loadTable('0', '13');
  }

  loadTable(page: string, size: string) {
    this.loading = true;
    this.df.detectChanges();
    this.cdrService.getCdrsWithPaging(this.filter, page, size)
    .subscribe( data => {
      this.totalRecords = data.totalElements;
      this.cdrs = data.content;
      this.cdrs.forEach(cdr => {
        this.cols = [
          { field: 'entityId', header: '', type: 'id', width: '50px'},
          { field: 'subscriber', header: 'Subscriber', type: 'number', filterMatchMode: 'contains', width: '202px'},
          { field: 'terminalGroup', header: 'Grupo de terminal?', type: 'number', width: '120px' },
          { field: 'totalCalls', header: 'Total de chamadas', type: 'link', width: '120px'},
          { field: 'totalCharge', header: 'Valor total', type: 'currency', width: '150px' },
          { field: 'totalDuration', header: 'Duração total', type: 'time', width: '110px'},
          { field: 'totalArbor', header: 'Valor Total Arbor', type: 'number', width: '120px' },
          { field: 'cpf', header: 'CPF/CNPJ', type: 'number', width: '120px' },
          { field: 'tipoCadastroPessoa', header: 'Pessoa física/jurídica', type: 'number', width: '150px' },
          { field: 'perfil', header: 'Perfil', type: 'number', width: '100px' },
          { field: 'inad', header: 'Inad.?', type: 'number', width: '100px' },
          { field: 'fraud', header: 'Fraud?', type: 'number', width: '100px' },
          { field: 'ccin', header: 'Bloq. CCIN?', type: 'number', width: '100px' },
          { field: 'signus', header: 'Bloq. Signus?', type: 'number', width: '100px' },
          { field: 'clarify', header: 'Está no Clarify?', type: 'number', width: '100px' },
          { field: 'quantidadeMdb', header: 'Quantidade de linhas no MDB', type: 'number', width: '152px' },
          { field: 'dataAtivacaoLinha', header: 'Data de ativação da linha', type: 'number', width: '150px' },
          { field: 'dataClienteMercado', header: 'Data do cliete no mercado', type: 'number', width: '150px' },
        ];
      });
      this.loading = false;
      this.endExecution = moment();
      this.calcSeconds();
    });
  }

  /* TODO:
    Quando for definido o sort pela HP e implementado no server, remover o if do sort e passar o SortField e SortOrder para o server
  */
 loadCdrsLazy(event: LazyLoadEvent) {
  console.log('buscou tabela (lazy)');
  if (!event.sortField) {
    if (this.filter) {
      this.loadTable((event.first / event.rows) + '', event.rows + '');
    }
  }
}

  calcSeconds() {
    const duration = moment.duration(this.endExecution.diff(this.startExecution));
    this.calcDuration = this.util.convert(duration.asSeconds(), 'time');
  }

  columnFilter(event: any, field) {
    this.dataTable.filter(event.target.value, field, 'contains');
  }

  /**
   * Implementar quando for definido o Sort
   */
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
       console.log(data1);
       console.log(data2);
       /*  let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result); */
        return (event.order * 1);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.tableWidth = this.calcWidth();
  }

  goToDetailCdrPage(cdr: Cdr) {
    this.entityId = cdr.entityId;
    this.filter.entityId = this.entityId;
    this.util.loadDetailsList.emit(this.entityId);
    this.util.changeView.emit(ShowView.detail);
  }

  convert(value, type) {
    return this.util.convert(value, type);
  }

  calcWidth() {
    return  ( (window.innerWidth - 30) >= 1280 ? (window.innerWidth - 30) : 1280) + 'px';
  }

  back(): void {
    this.util.changeView.emit(ShowView.filter);
    this.dataTable.reset();
  }

}
