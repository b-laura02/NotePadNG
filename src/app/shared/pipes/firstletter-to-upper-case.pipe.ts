import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstletterToUpperCase'
})
export class FirstletterToUpperCasePipe implements PipeTransform {

  transform(value: string | any, ...args: unknown[]): unknown {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
