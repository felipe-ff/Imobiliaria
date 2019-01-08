import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListHousesComponent implements OnInit {

  houseList = [1, 2, 3];
  selectedFile: File = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:8080/books/add', fd)
      .subscribe(res => {
        console.log(res);
      });
  }

}
