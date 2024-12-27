import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashConcat',
})
export class DashConcatPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}
