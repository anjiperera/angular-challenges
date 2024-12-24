import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoQuery } from '../data-access/todo.query';
import { TodoItemComponent } from './todo-item.component';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-todos',
  template: `
    @switch (todosQuery.status()) {
      @case ('pending') {
        <mat-spinner [diameter]="20" color="blue" />
      }
      @case ('error') {
        Error has occurred: {{ todosQuery.error() }}
      }
      @default {
        <div class="todo-container">
          @for (todo of todosQuery.data(); track todo.id) {
            <app-todo-item [todo]="todo" />
          }
        </div>
      }
    }
  `,
  styles: [
    `
      .todo-container {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  todoQuery = inject(TodoQuery);

  todosQuery = this.todoQuery.injectAllTodos();
}
