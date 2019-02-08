import { RouterModule, Routes } from '@angular/router';
import { HomeGalleryComponent } from './home-gallery/home-gallery.component';
import { ListHousesComponent } from './list-houses/list-houses.component';
import { DetailHouseComponent } from './detail-house/detail-house.component';
import { AddHouseComponent } from './add-house/add-house.component';


const routes: Routes = [
  { path: 'list-houses', component: ListHousesComponent },
  { path: 'detail-house', component: DetailHouseComponent },
  { path: 'add-house', component: AddHouseComponent },
  { path : '', component : HomeGalleryComponent }
];

export const routing = RouterModule.forRoot(routes);
