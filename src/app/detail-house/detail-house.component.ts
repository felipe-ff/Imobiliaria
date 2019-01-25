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
  houseImageList = [];
  imgUrl = '';
  widthExp = document.documentElement.clientWidth - 100;
  heightExp = document.documentElement.clientHeight - 50;
  currentImgUrl;
  currentImgIndex;
  propList = [];

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
        this.houseImageList = data;
        this.listObjectProps();
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

  showDialog(imageUrl, i) {
    this.displayDialog = true;
    this.currentImgUrl = imageUrl;
    this.currentImgIndex = i;
    setTimeout(() => { this.presetDiag.center(); }, 200);
  }

  nextImage() {
    this.currentImgIndex++;
    if (!this.houseImageList[this.currentImgIndex]) {
      this.currentImgIndex = 0;
    }
    this.currentImgUrl = this.houseImageList[this.currentImgIndex].imageUrl;
  }

  prevImage() {
    this.currentImgIndex--;
    if (!this.houseImageList[this.currentImgIndex]) {
      this.currentImgIndex = this.houseImageList.length - 1;
    }
    this.currentImgUrl = this.houseImageList[this.currentImgIndex].imageUrl;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.widthExp = document.documentElement.clientWidth - 100;
    this.heightExp = document.documentElement.clientHeight - 50;
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 27) { //Escape keycode
      this.displayDialog = false;
    }
    if (event.keyCode === 37) { //left arrow keycode
      this.prevImage();
    }
    if (event.keyCode === 39) { //right arrow keycode
      this.nextImage();
    }
  }

  listObjectProps() {
    const element = this.houseImageList[0];
    for (const property in element) {
      if (element.hasOwnProperty(property)) {
        switch(property) {
          case 'dorm':
            this.propList.push({name: 'Dormitórios', value: element[property], icon: 'fa fa-bed'});
            break;

          case 'kitchen':
            this.propList.push({name: 'Cozinha', value: element[property], icon: 'fa fa-cutlery'});
            break;

          case 'garage':
            this.propList.push({name: 'Vagas na garagem', value: (element[property]), icon: 'fa fa-car'});
            break;
        }
      }
    }
  }

}
