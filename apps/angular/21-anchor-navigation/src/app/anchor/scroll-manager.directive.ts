import { Directive } from '@angular/core';
import { ScrollSectionDirective } from './scroll-section.directive';

@Directive({
  selector: '[appScrollManager]',
  standalone: true,
})
export class ScrollManagerDirective {
  private sections = new Map<string, ScrollSectionDirective>();

  scroll(id: string) {
    if (!this.sections.has(id)) {
      throw new Error(`${id} must be implemented with ScrollSectionDirective`);
    }

    this.sections.get(id)!.scroll();
  }

  register(section: ScrollSectionDirective): void {
    this.sections.set(section.id, section);
  }

  remove(section: ScrollSectionDirective): void {
    this.sections.delete(section.id);
  }
}
