import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { UtilityService } from '../service/utility.service';
import { ShowView } from '../model/show-view.enum';
import { CdrService } from '../service/cdr.service';

@Component({
  selector: 'app-cdr-chart',
  templateUrl: './cdr-chart.component.html',
  styleUrls: ['./cdr-chart.component.css']
})
export class CdrChartComponent implements OnInit, AfterViewInit {
  destinationChart;
  totalValueChart: Chart;
  cdrChart: Chart;
  data;
  @Input() entityId: number;
  @Input() filter: any;

  constructor(public util: UtilityService, private cdrService: CdrService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.util.fitToScreen.emit();
    this.entityId = this.filter.entityId;
    this.loadDestinationChart();
    this.loadValueChart();
    this.loadCdrChart();
  }

  loadDestinationChart() {
    this.cdrService
      .getDestinationChart(this.entityId + '', this.filter)
      .subscribe(d => {
        this.data = d;
        const values = [];
        this.data.forEach(element => {
          values.push([element.date, element.total]);
        });
        this.sortValues(values);
        this.destinationChart = this.initChart(values, 'Quantidade de Destinos', 'Destinos');
        this.destinationChart.addSeries(this.createSeries(values));
      });
  }

  loadValueChart() {
    this.cdrService
      .getTotalValueChart(this.entityId + '', this.filter)
      .subscribe(d => {
        this.data = d;
        const values = [];
        this.data.forEach(element => {
          values.push([element.date, element.total]);
        });
        this.sortValues(values);
        this.totalValueChart = this.initChart(values, 'Valor', 'Centavos');
        this.totalValueChart.addSeries(this.createSeries(values));
      });
  }

  loadCdrChart() {
    this.cdrService
      .getCdrChart(this.entityId + '', this.filter)
      .subscribe(d => {
        this.data = d;
        const values = [];
        this.data.forEach(element => {
          values.push([element.date, element.total]);
        });
        this.sortValues(values);
        this.cdrChart = this.initChart(values, 'Quantidade de CDRs', 'CDRs');
        this.cdrChart.addSeries(this.createSeries(values));
      });
  }

  initChart(values, title, yLabel) {
    return new Chart({
      chart: {
        width: 1000,
        height: 260,
        type: 'line'
      },
      title: {
        text: title
      },
      credits: {
        enabled: false
      },
      xAxis: [
        {
          type: 'datetime',
          tickPositioner: function () {
            var positions = [],
                tick = Math.floor(this.dataMin),
                increment = Math.ceil((this.dataMax - this.dataMin));
            if ( (this.dataMax !== null && this.dataMin !== null) && (this.dataMax !== this.dataMin) ) {
                for (tick; tick - increment <= this.dataMax; tick += increment) {
                    positions.push(tick);
                }
            } else {
              positions.push(tick);
            }
            return positions;
          },
          /* tickInterval: 1,
          tickPositions: this.data[0].value,
          startOnTick: true,
          endOnTick: true, */
          labels: {
            format: '{value:%d/%m}'
          },
          title: {
            text: 'Dias'
          }
        }
      ],
      yAxis: {
        title: {
          text: yLabel
        }
      }
    });
  }

  createSeries(data) {
    return {
      showInLegend: false,
      data: data
    };
  }

  /*
    Deveria vir ordenado do servidor (remover quando estiver)
  */
  sortValues(values) {
    values.sort(function(obj1, obj2) {
      return obj2.timeKey - obj1.timeKey;
    });
  }

  back(): void {
    this.util.changeView.emit(ShowView.detail);
  }
}
