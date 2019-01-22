import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import { CdrService } from '../service/cdr.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailHouseComponent implements OnInit {

  selectedFile: File = null;
  displayDialog = false;
  loading = false;
  house = [];
  imgUrl = '';
  widthExp = document.documentElement.clientWidth - 100;
  heightExp = document.documentElement.clientHeight - 50;
  currentImgUrl;

  @ViewChild('presetDiag') presetDiag: Dialog;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
             private cdrService: CdrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.cdrService.getBookById(+id)
      .subscribe( data => {
        console.log(data);
        this.house = data;
        const img = new Image();
      /* img.addEventListener('load', function() {
          //alert( this.naturalWidth + ' ' + this.naturalHeight );
      });
      img.src = data.imageUrl; */
        //this.imgUrl = data.imageUrl;
        });
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.loading = true;
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post('http://localhost:8080/books/add', fd)
        .subscribe(res => {
          this.loading = false;
          this.router.navigateByUrl('/list-houses');
        },
        error => {
          this.loading = false;
          this.router.navigateByUrl('/list-houses');
        }
        );
    }
  }

  showDialog(imageUrl) {
    this.displayDialog = true;
    this.currentImgUrl = imageUrl;
    setTimeout(() => { this.presetDiag.center(); }, 200);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.widthExp = document.documentElement.clientWidth - 100;
    this.heightExp = document.documentElement.clientHeight - 50;
  }

}
