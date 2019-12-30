import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[cWidth]'
})
export class CustomWidthDirective implements AfterViewInit {
    @Input() cWidth: string;
    constructor(private elRef: ElementRef) {  }
    ngAfterViewInit(): void {
       this.elRef.nativeElement.style.width = this.cWidth;
    }
  }
