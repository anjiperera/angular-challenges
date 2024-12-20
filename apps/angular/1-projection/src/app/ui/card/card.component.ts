import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="img"></ng-content>

    <section>
      @for (item of list; track $index) {
        <ng-container>
          <ng-template
            [ngTemplateOutlet]="rowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </ng-container>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Output() add = new EventEmitter<void>();

  @ContentChild('rowRef', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;
}
