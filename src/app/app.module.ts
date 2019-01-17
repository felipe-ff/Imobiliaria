import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { ListGroupComponent } from './group/list-group/list-group.component';
import { ListCdrComponent } from './cdr/list-cdr/list-cdr.component';
import { GroupService } from './service/group.service';
import { PresetService } from './service/preset.service';
import { CdrService } from './service/cdr.service';
import { AuthService } from './service/AuthService';
import { UtilityService } from './service/utility.service';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { RadioButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/inputtext';
import { CustomWidthDirective } from './service/custom-width.directive';
import { DetailCdrComponent } from './cdr/detail-cdr/detail-cdr.component';
import { ListCdrSubscriberComponent } from './cdr/list-cdr-subscriber/list-cdr-subscriber.component';
import { ReportComponent } from './report/report.component';
import { HttpIntercept } from './service/http-intercept';
import {NgxMaskModule} from 'ngx-mask';
import { ChartModule } from 'angular-highcharts';
import { CdrChartComponent } from './cdr-chart/cdr-chart.component';
import { FilterCdrComponent } from './cdr/filter-cdr/filter-cdr.component';
import { ListPresetComponent } from './list-preset/list-preset.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { DetailHouseComponent } from './detail-house/detail-house.component';
import { AddHouseComponent } from './add-house/add-house.component';
import { Globals } from './service/globals';

@NgModule({
  declarations: [
    AppComponent,
    ListGroupComponent,
    ListCdrComponent,
    AddGroupComponent,
    EditGroupComponent,
    CustomWidthDirective,
    DetailCdrComponent,
    ListCdrSubscriberComponent,
    ReportComponent,
    CdrChartComponent,
    FilterCdrComponent,
    ListPresetComponent,
    ListHousesComponent,
    DetailHouseComponent,
    AddHouseComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    CardModule,
    TableModule,
    SelectButtonModule,
    FormsModule,
    FieldsetModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    ChartModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    RadioButtonModule,
    InputTextModule
  ],
  providers: [GroupService, Globals, PresetService, {provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}, CdrService,
    AuthService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
