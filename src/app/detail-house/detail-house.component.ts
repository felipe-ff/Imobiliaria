import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import { CdrService } from '../service/cdr.service';
import { Dialog } from 'primeng/dialog';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailHouseComponent implements OnInit {

  selectedFile: File = null;
  displayDialog = false;
  displayPropDialog = false;
  loading = false;
  houseImageList: any = [];
  house;
  imgUrl = '';
  widthExp = document.documentElement.clientWidth - 100;
  heightExp = document.documentElement.clientHeight - 50;
  currentImgUrl;
  currentImgIndex;
  propList = [];
  dialogObj: any = {};
  value: number;

  @ViewChild('presetDiag') presetDiag: Dialog;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
             private cdrService: CdrService, public auth: AuthService) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.houseImageList = [];
    this.propList = [];
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.cdrService.getBookById(+id)
      .subscribe( data => {
        this.houseImageList = data;
        this.house = this.houseImageList[0];
        this.listObjectProps();
        /*const img = new Image();
        img.addEventListener('load', function() {
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
      this.http.post('http://localhost:8081/books/add', fd)
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

  update() {
    const obj = this.houseImageList[0];
    delete obj.bookId;
    delete obj.idImagesUrl;
    delete obj.imageUrl;
    delete obj.name;
    obj[this.dialogObj.field] = Number(this.value);
    this.cdrService.updateBook(obj).subscribe(res => {
      //colocar loading
      //this.initialize();
      this.house = res[0];
      this.listObjectProps();
      this.displayPropDialog = false;
    },
    error => {
    }
    );
  }

  showDialog(imageUrl, i) {
    this.displayDialog = true;
    this.currentImgUrl = imageUrl;
    this.currentImgIndex = i;
    setTimeout(() => {
      const element = document.getElementsByClassName('ui-widget-overlay ui-dialog-mask')[0];
      element.classList.add('mystyle');
      this.presetDiag.center();
    }, 1);
  }

  showEditDialog(name, field) {
    this.displayPropDialog = true;
    this.dialogObj.name = name;
    this.dialogObj.field = field;
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
    this.propList = [];
    for (const property in this.house) {
      if (this.house.hasOwnProperty(property)) {
        switch (property) {
          case 'dorm':
            if (this.house[property]) {
              this.propList.push({name: 'Dormitórios', field: property, value: this.house[property], icon: 'fa fa-bed'});
            }
            break;

          case 'kitchen':
            if (this.house[property]) {
              this.propList.push({name: 'Cozinhas', field: property, value: this.house[property], icon: 'fa fa-cutlery'});
            }
            break;

          case 'garage':
            if (this.house[property]) {
              this.propList.push({name: 'Vagas na garagem', field: property, value: (this.house[property]), icon: 'fa fa-car'});
            }
            break;

          case 'livingRoom':
            if (this.house[property]) {
              this.propList.push({name: 'Salas', field: property, value: (this.house[property]), icon: 'fa fa-simplybuilt'});
            }
            break;

          case 'bathroom':
            if (this.house[property]) {
              this.propList.push({name: 'Banheiros', field: property, value: (this.house[property]), icon: 'fa fa-tint'});
            }
            break;
        }
      }
    }
  }

}
