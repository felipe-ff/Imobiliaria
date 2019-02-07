import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { CdrService } from '../service/cdr.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {

  selectedFile: Array<File> = [];
  loading = false;
  newForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private cdrService: CdrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newForm = this.initializeForm();
  }

  onFileSelected(event) {
    this.selectedFile = <Array<File>>event.target.files;

  }

  initializeForm() {
    return this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      type: [''],
      dorm: [''],
      bathroom: [''],
      livingRoom: [''],
      a: [''],
      b: [''],
      c: [''],
      e: [''],
      price: ['']
    },
    );
  }

  /**
   * Checar tipos de arquivo e tamanho da imagem
   * Max 10mb
   */
  onUpload() {
    if (this.selectedFile) {

    const formData: any = new FormData();
    const files: Array<File> = this.selectedFile;
    console.log(files);

    this.loading = true;

    for (let i = 0; i < files.length; i++){
        formData.append('images', files[i], files[i]['name']);
    }
    if (this.newForm.value.type) {
      formData.append('type', this.newForm.value.type);
    }
    if (this.newForm.value.dorm) {
      formData.append('dorm', this.newForm.value.dorm);
    }
    if (this.newForm.value.bathroom) {
      formData.append('bathroom', this.newForm.value.bathroom);
    }
    if (this.newForm.value.livingRoom) {
      formData.append('livingRoom', this.newForm.value.livingRoom);
    }
    if (this.newForm.value.price) {
      formData.append('price', this.newForm.value.price);
    }

    formData.append('publishedDate', moment().toString);

    this.cdrService.addBook(formData).subscribe(res => {
      this.loading = false;
      this.router.navigateByUrl('/list-houses');
    },
    error => {
      this.loading = false;
      this.router.navigateByUrl('/list-houses');
    }
    );


     /*  const myArray = [];
      for (const key in this.selectedFile) {
        if (this.selectedFile.hasOwnProperty(key) && this.selectedFile[key] != null) {
          myArray.push(this.selectedFile[key]);
        }
      }
      console.log(myArray);
      this.loading = true;
      const fd = new FormData();
      fd.append('files', this.selectedFile, 'files');
      this.http.post('http://localhost:8081/books/add', fd)
        .subscribe(res => {
          this.loading = false;
          this.router.navigateByUrl('/list-houses');
        },
        error => {
          this.loading = false;
          this.router.navigateByUrl('/list-houses');
        }
        ); */
    }
  }

}
