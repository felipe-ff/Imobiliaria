import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CdrService } from './service/cdr.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/authService';
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
import { HttpIntercept } from './service/http-intercept';
import {NgxMaskModule} from 'ngx-mask';
import { ChartModule } from 'angular-highcharts';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { DetailHouseComponent } from './detail-house/detail-house.component';
import { AddHouseComponent } from './add-house/add-house.component';
import { Globals } from './service/globals';
import { RangeValues } from './pipes/range-values.pipe';
import { SingleControlComponent } from './shared/single-control.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomWidthDirective,
    HomeGalleryComponent,
    ListHousesComponent,
    DetailHouseComponent,
    RangeValues,
    SingleControlComponent,
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
  providers: [Globals, {provide: HTTP_INTERCEPTORS, useClass: HttpIntercept, multi: true}, CdrService,
    UserService, AuthService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
