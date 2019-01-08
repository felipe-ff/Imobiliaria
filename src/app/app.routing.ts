import { RouterModule, Routes } from '@angular/router';
import {AddGroupComponent} from './group/add-group/add-group.component';
import {EditGroupComponent} from './group/edit-group/edit-group.component';
import {ListGroupComponent} from './group/list-group/list-group.component';
import {ReportComponent} from './report/report.component';
import { FilterCdrComponent } from './cdr/filter-cdr/filter-cdr.component';
import { ListHousesComponent } from './list-houses/list-houses.component';


const routes: Routes = [
  { path: 'add-group', component: AddGroupComponent },
  { path: 'edit-group', component: EditGroupComponent },
  { path: 'list-group', component: ListGroupComponent },
  { path: 'list-cdr', component: FilterCdrComponent },
  { path: 'report', component: ReportComponent },
  { path: 'list-houses', component: ListHousesComponent },
  { path : '', component : FilterCdrComponent }
];

export const routing = RouterModule.forRoot(routes);
