import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-filter-cdr',
  templateUrl: './filter-cdr.component.html',
  styleUrls: ['./filter-cdr.component.css']
})
export class FilterCdrComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('myDiv') myDiv: ElementRef;

  showArrows = false;

  constructor(public renderer: Renderer) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const el = this.myDiv.nativeElement.parentNode.parentNode.parentNode;
    this.renderer.setElementStyle(el, 'background', '#080D20');

    const el2 = this.myDiv.nativeElement.parentNode.parentNode.parentNode.parentNode.parentNode;
    this.renderer.setElementStyle(el2, 'background', '#080D20');
  }

  ngOnDestroy() {
    const el = this.myDiv.nativeElement.parentNode.parentNode.parentNode;
    this.renderer.setElementStyle(el, 'background', 'white');

    const el2 = this.myDiv.nativeElement.parentNode.parentNode.parentNode.parentNode.parentNode;
    this.renderer.setElementStyle(el2, 'background', 'white');
  }

  nextImage() {
    //this.showArrows = true;
  }


}
