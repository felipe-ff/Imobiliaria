import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'rangeValues'})
export class RangeValues implements PipeTransform {
  transform(initial: number, final: number): string {
    const finalString = final < 5000 ? 'R$ ' + final : 'Max';
    return `Valor: R$ ${initial} - ${finalString}`;
  }
}
