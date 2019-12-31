import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pluralStringBuilder'})
export class PluralStringBuilder implements PipeTransform {
  transform(prefix: string, quantity: number): string {
    return prefix +  ' dormitório ' + (quantity > 1 ? 's' : '');
  }
}
