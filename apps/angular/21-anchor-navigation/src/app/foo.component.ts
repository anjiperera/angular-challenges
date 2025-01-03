import { Component } from '@angular/core';
import { NavButtonDirective } from './nav-button.component';

@Component({
  imports: [NavButtonDirective],
  selector: 'app-foo',
  template: `
    Welcome to foo page
    <button appNavButton="home" class="fixed left-1/2 top-3">Home Page</button>
    <div class="h-screen bg-blue-200">section 1</div>
    <div class="h-screen bg-red-200">section 2</div>
  `,
})
export class FooComponent {}
