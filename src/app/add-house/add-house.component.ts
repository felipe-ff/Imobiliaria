import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { CdrService } from '../service/cdr.service';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {

  selectedFile: Array<File> = [];
  loading = false;

  constructor(private http: HttpClient, private router: Router, private cdrService: CdrService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = <Array<File>>event.target.files;

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

    for(let i = 0; i < files.length; i++){
        formData.append('images', files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
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
      this.http.post('http://localhost:8080/books/add', fd)
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
