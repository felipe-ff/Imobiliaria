import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdrService } from '../service/cdr.service';
import {Router} from '@angular/router';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListHousesComponent implements OnInit {

  houseList;

  constructor(private cdrService: CdrService, public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.listHouses();
  }

  listHouses() {
    this.cdrService.getBooks()
   .subscribe( data => {
      console.log(data);
      this.houseList = data.items;
    });
  }

  navigate(id: number) {
    this.router.navigate(['/detail-house', id]);
  }

  delete(id: number) {
    this.cdrService.deleteBook(id)
      .subscribe( data => {
        console.log(data);
        this.listHouses();
      },
      headers => {
        console.log(headers);
      }
      );

  }

}
