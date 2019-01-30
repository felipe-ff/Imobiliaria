import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UtilityService } from './service/utility.service';
import { ChangeDetectorRef } from '@angular/core';
import { VERSION } from '../environments/version';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service/AuthService';

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

  constructor(private util: UtilityService, public authService: AuthService, private cdRef: ChangeDetectorRef,
      private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchCdrForm = this.initializeForm();
    this.loginForm = this.initializeLoginForm();
    this.durationTypeOptions = [
      {name: 'Aluguel', code: '1'},
      {name: 'Venda', code: '2'}
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
      typeDuration: [{name: 'Aluguel', code: 1}],
      rangeValues: [[0, 4000]]
    },
    );
  }

  initializeLoginForm() {
    return this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
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
          this.displayLoginDialog = false;
          this.displayLoadingDiag = false;
        });
    }
  }

  get f() { return this.searchCdrForm.controls; }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const elWidth = this.main.nativeElement.children[1].offsetWidth + 22;
      const docWidth = document.documentElement.clientWidth;
      this.widthExp = (elWidth) > (docWidth - 18) ? elWidth : docWidth;
  }

}
