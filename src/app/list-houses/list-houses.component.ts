import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdrService } from '../service/cdr.service';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../service/AuthService';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListHousesComponent implements OnInit {

  heroes$: Observable<any[]>;
  houseList;
  loading = false;

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
        console.log(data);
        this.houseList = data.items;
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

}
