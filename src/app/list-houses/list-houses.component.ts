import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdrService } from '../service/cdr.service';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../service/authService';
import { Purpose } from '../model/purpose.enum';
import { Type } from '../model/type.enum';

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
  type = Type;

  constructor(
    private cdrService: CdrService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listHouses();
  }

  fetchImageUrl(house) {
    return house.imageUrl ? house.imageUrl[0] : '';
  }

  listHouses() {
    this.loading = true;

    this.route.queryParams.subscribe(params => {
      const type = params['type'];
      this.cdrService.getBooks(type).subscribe( data => {
        this.houseList = data.items;
        console.log(this.houseList);
        this.houseList.forEach(element => {
          element.loading = true;
        });
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
