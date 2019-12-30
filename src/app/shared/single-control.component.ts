import { Input, Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-single-control-component',
  template: `
      <select class="form-control custom-small large" [formControl]="control">
        <option value="">{{ label }}...</option>
        <option *ngFor="let item of list | keyvalue; let i = index" [value]="i">
          {{ item.value }}
        </option>
      </select>
      `
})
export class SingleControlComponent{
  @Input() control: AbstractControl;
  @Input() list: any[];
  @Input() label: string;
}
