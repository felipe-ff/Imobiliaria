import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  addNewHouseForm: FormGroup;

  constructor(
    private router: Router,
    private cdrService: CdrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addNewHouseForm = this.initializeForm();
  }

  onFileSelected(event) {
    this.selectedFile = <Array<File>>event.target.files;
  }

  initializeForm() {
    return this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      type: [''],
      dorm: ['0'],
      bathroom: ['0'],
      livingRoom: ['0'],
      kitchen: ['0'],
      garage: ['0'],
      city: ['0'],
      district: ['0'],
      price: ['0'],
      purpose: ['rent'],
    },
    );
  }

  /**
   * Checar tipos de arquivo e tamanho da imagem
   * Max 10mb
   */
  onUpload() {
    const formData: any = new FormData();
    this.loading = true;

    if (this.selectedFile) {
      const files: Array<File> = this.selectedFile;
      for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i], files[i]['name']);
      }
    }

    for (const key in this.addNewHouseForm.value) {
      if (this.addNewHouseForm.value.hasOwnProperty(key)) {
        const value = this.addNewHouseForm.value[key];
        if (value) {
          formData.append(key, value);
        }
      }
    }

    //npmformData.append('publishedDate', moment().toString);

    this.cdrService.addBook(formData).subscribe(res => {
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
