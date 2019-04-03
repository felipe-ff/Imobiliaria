import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdrService } from '../service/cdr.service';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../service/AuthService';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Purpose } from '../model/purpose.enum';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListHousesComponent implements OnInit {

  houseList;
  loading = false;
  purpose = Purpose;

  constructor(private cdrService: CdrService, public authService: AuthService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.listHouses();
  }

  listHouses() {
    this.loading = true;

    this.route.queryParams.subscribe(params => {
      const type = params['type'];
      console.log(type);
      this.cdrService.getBooks(type).subscribe( data => {
        this.houseList = data.items;
        this.houseList.forEach(element => {
          element.loading = true;
        });
        console.log(this.houseList);
        this.loading = false;
      });
    });
  }

  navigate(id: number) {
    this.router.navigate(['/detail-house', id]);
  }

  delete(id: number) {
    this.cdrService.deleteBook(id)
      .subscribe( data => {
        this.listHouses();
      },
      headers => {
        console.log(headers);
      }
      );
  }

  onLoad(house) {
    house.loading = false;
  }

}
