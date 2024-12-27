import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DashConcatPipe } from './dash-concat.pipe';

@Component({
  imports: [NgFor, DashConcatPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | dashConcat: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
