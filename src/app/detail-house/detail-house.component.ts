import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/filter';
import { CdrService } from '../service/cdr.service';
import { Dialog } from 'primeng/dialog';
import { AuthService } from '../service/authService';
import { UtilityService } from '../service/utility.service';
import { PropertyItem } from '../model/property-item.enum';

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

  constructor(
    private route: ActivatedRoute,
    private cdrService: CdrService,
    public auth: AuthService,
    public util: UtilityService
  ) { }

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

      this.cdrService.updateBook(this.house._id, formData).subscribe(res => {
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

      this.cdrService.updateBook(this.house._id, formData).subscribe(res => {
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
      if (this.house.hasOwnProperty(property) && this.house[property]) {

        const propertyObj = {
          name: PropertyItem[property].name,
          field: property,
          value: this.house[property],
          icon: PropertyItem[property].icon
        };
        this.propList.push(propertyObj);
      }
    }
  }

}
