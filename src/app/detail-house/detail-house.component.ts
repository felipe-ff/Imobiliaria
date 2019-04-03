import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import { CdrService } from '../service/cdr.service';
import { Dialog } from 'primeng/dialog';
import { AuthService } from '../service/AuthService';
import { UtilityService } from '../service/utility.service';

@Component({
  selector: 'app-detail-house',
  templateUrl: './detail-house.component.html',
  styleUrls: ['./detail-house.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailHouseComponent implements OnInit {

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
  selectedFile: Array<File> = [];

  @ViewChild('presetDiag') presetDiag: Dialog;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
             private cdrService: CdrService, public auth: AuthService, public util: UtilityService) { }

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
        this.house = data;
        this.houseImageList = data.imageUrl;
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
    this.selectedFile = <Array<File>>event.target.files;
  }

  onUpload() {
    if (this.selectedFile && this.selectedFile.length > 0) {
      this.loading = true;
      const formData: any = this.util.buildFormData(this.house);

      const files: Array<File> = this.selectedFile;
      for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i], files[i]['name']);
      }

      this.cdrService.updateBook(this.house.id, formData).subscribe(res => {
        this.loading = false;
        this.selectedFile = [];
        this.util.toastr.infoToastr('Salvo com sucesso!');
        this.house = res;
        this.houseImageList = res.imageUrl;
      },
      error => {
        this.selectedFile = [];
        this.loading = false;
      }
      );
    }
  }

  update(field, value) {
    /* const obj = this.house;
    obj[this.dialogObj.field] = Number(value);
    this.cdrService.updateBook(obj).subscribe(res => {
      //colocar loading
      this.house = res;
      this.listObjectProps();
      this.displayPropDialog = false;
    },
    error => {
    }
    ); */
  }

  updRemoveImage(i) {
    if (this.auth.isLoggedIn()) {
      this.house.imageUrl.splice(i, 1);

      const formData: any = this.util.buildFormData(this.house);

      this.cdrService.updateBook(this.house.id, formData).subscribe(res => {
        //colocar loading
        this.house = res;
        this.houseImageList = res.imageUrl;
        this.util.toastr.infoToastr('Excluído com sucesso!');
      },
      error => {
      });
    } else {
      this.util.toastr.errorToastr('Sessão expirada, por favor refaça o login!');
    }
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
    this.currentImgUrl = this.houseImageList[this.currentImgIndex];
  }

  prevImage() {
    this.currentImgIndex--;
    if (!this.houseImageList[this.currentImgIndex]) {
      this.currentImgIndex = this.houseImageList.length - 1;
    }
    this.currentImgUrl = this.houseImageList[this.currentImgIndex];
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
              this.propList.push({name: 'Dormitórios', field: property, value: this.house[property], icon: 'fas fa-bed'});
            }
            break;

          case 'kitchen':
            if (this.house[property]) {
              this.propList.push({name: 'Cozinhas', field: property, value: this.house[property], icon: 'fas fa-utensils'});
            }
            break;

          case 'garage':
            if (this.house[property]) {
              this.propList.push({name: 'Vagas na garagem', field: property, value: (this.house[property]), icon: 'fas fa-car'});
            }
            break;

          case 'livingRoom':
            if (this.house[property]) {
              this.propList.push({name: 'Salas', field: property, value: (this.house[property]), icon: 'fas fa-couch'});
            }
            break;

          case 'bathroom':
            if (this.house[property]) {
              this.propList.push({name: 'Banheiros', field: property, value: (this.house[property]), icon: 'fas fa-toilet'});
            }
            break;
        }
      }
    }
  }

}
