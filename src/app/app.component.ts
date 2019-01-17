import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UtilityService } from './service/utility.service';
import { ChangeDetectorRef } from '@angular/core';
import { VERSION } from '../environments/version';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  durationTypeOptions: { name: string , code: string }[];
  rangeValues: number[] = [20, 80];

  constructor(private util: UtilityService, public authService: AuthService, private cdRef: ChangeDetectorRef,
      private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchCdrForm = this.initializeForm();
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

  logout() {
    this.authService.logout();
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    const user = {user: {email: 'felipe.ferraz18@gmail.com', password: '123'}};
    this.authService.login(user);
  }

  get f() { return this.searchCdrForm.controls; }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const elWidth = this.main.nativeElement.children[1].offsetWidth + 22;
      const docWidth = document.documentElement.clientWidth;
      this.widthExp = (elWidth) > (docWidth - 18) ? elWidth : docWidth;
  }

}
