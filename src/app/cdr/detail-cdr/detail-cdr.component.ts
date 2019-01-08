import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';
import { ShowView } from 'src/app/model/show-view.enum';

@Component({
  selector: 'app-detail-cdr',
  templateUrl: './detail-cdr.component.html',
  styleUrls: ['./detail-cdr.component.css']
})
export class DetailCdrComponent implements OnInit {

  constructor(public util: UtilityService) { }

  ngOnInit() {

  }

  back() {
    this.util.changeView.emit(ShowView.detail);
  }
}
