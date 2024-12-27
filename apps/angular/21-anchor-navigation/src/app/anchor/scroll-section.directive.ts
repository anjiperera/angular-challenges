import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ScrollManagerDirective } from './scroll-manager.directive';

@Directive({
  selector: '[appScrollSection]',
  standalone: true,
})
export class ScrollSectionDirective implements OnInit, OnDestroy {
  @Input('appScrollSection') id!: string;

  manager = inject(ScrollManagerDirective, { skipSelf: true });
  host = inject(ElementRef<HTMLElement>);

  ngOnDestroy(): void {
    this.manager.remove(this);
  }

  ngOnInit(): void {
    this.manager.register(this);
  }

  scroll() {
    this.host.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
