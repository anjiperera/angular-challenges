import { Component } from '@angular/core';
import { appAnchorDirective } from './anchor/anchor-button.directive';
import { ScrollManagerDirective } from './anchor/scroll-manager.directive';
import { ScrollSectionDirective } from './anchor/scroll-section.directive';
import { NavButtonDirective } from './nav-button.component';

@Component({
  imports: [NavButtonDirective, ScrollSectionDirective, appAnchorDirective],
  selector: 'app-home',
  hostDirectives: [ScrollManagerDirective],
  template: `
    <button appNavButton="/foo" class="fixed left-1/2 top-3">Foo Page</button>
    <div appScrollSection="top" class="h-screen bg-gray-500">
      Empty
      <button appAnchor="bottom">Scroll Bottom</button>
    </div>
    <div appScrollSection="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <button appAnchor="top">Scroll Top</button>
    </div>
  `,
})
export class HomeComponent {}
