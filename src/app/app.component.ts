import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UtilityService } from './service/utility.service';
import { Cities } from '../app/model/cities.enum';
import { Neightborhoods } from '../app/model/neightborhoods.enum';
import { Rooms } from '../app/model/rooms.enum';
import { Type } from '../app/model/type.enum';
import { ChangeDetectorRef } from '@angular/core';
import { VERSION } from '../environments/version';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service/authService';
import { Router } from '@angular/router';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  version = VERSION.hash;

  @ViewChild('main') main: ElementRef;

  widthExp = document.documentElement.clientWidth - 18;
  searchCdrForm: FormGroup;
  loginForm: FormGroup;
  durationTypeOptions: { name: string , code: string }[];
  rangeValues: number[] = [20, 80];
  displayLoginDialog = false;
  loading = false;
  displayLoadingDiag;
  cities = Cities;
  rooms = Rooms;
  neightborhoods = Neightborhoods;
  types = Type;

  constructor(private util: UtilityService, public authService: AuthService, private cdRef: ChangeDetectorRef,
      private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    console.log(this.cities);
    this.searchCdrForm = this.initializeForm();
    this.loginForm = this.initializeLoginForm();
    this.durationTypeOptions = [
      //{name: 'Todos', code: ''},
      {name: 'Aluguel', code: 'rent'},
      {name: 'Venda', code: 'sell'}
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const elWidth = this.main.nativeElement.children[1].offsetWidth + 22;
      const docWidth = document.documentElement.clientWidth;
      this.widthExp = (elWidth) > (docWidth - 18) ? elWidth : docWidth;
    }, 500);
  }

  initializeForm() {
    const pattern = '^(0|[0-9][0-9]*)$';
    return this.formBuilder.group({
      purpose: [{name: 'Aluguel', code: 'rent'}],
      rangeValues: [[0, 4000]],
      type: [''],
      dorm: [''],
      bathroom: [''],
      city: [''],
      district: ['']
    },
    );
  }

  initializeLoginForm() {
    return this.formBuilder.group({
      user: [ (isDevMode() ? 'admin' : ''), Validators.required],
      password: [ (isDevMode() ? 'admin123' : ''), Validators.required]
    },
    );
  }

  logout() {
    this.authService.logout();
  }

  login() {
    /*this.submitted = true;*/
    if (this.loginForm.valid) {
      const user = {user: {email: this.loginForm.value.user, password: this.loginForm.value.password}};
      this.displayLoadingDiag = true;
      this.authService.login(user).subscribe(
        res => {
          this.authService.setSession(res);
          this.displayLoginDialog = false;
          this.displayLoadingDiag = false;
        }
        , error => {
          console.log(error);
          this.displayLoadingDiag = false;
        });
    }
  }

  navigate() {
    this.router.navigate(['/list-houses'], {queryParams: { type: JSON.stringify(this.searchCdrForm.value)}} );
  }

  get f() { return this.searchCdrForm.controls; }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const elWidth = this.main.nativeElement.children[1].offsetWidth + 22;
      const docWidth = document.documentElement.clientWidth;
      this.widthExp = (elWidth) > (docWidth - 18) ? elWidth : docWidth;
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 27) { //Escape keycode
      this.displayLoginDialog = false;
    }
    if (event.keyCode === 13) { //enter keycode
      this.login();
    }
  }

}
