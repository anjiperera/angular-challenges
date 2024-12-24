import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoQuery } from '../data-access/todo.query';
import { Todo } from '../model/todo.model';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule],
  selector: 'app-todo-item',
  template: `
    @if (updateTodoQuery.isPending() || deleteTodoQuery.isPending()) {
      <mat-spinner [diameter]="20" color="blue" />
    }
    @if (updateTodoQuery.isError()) {
      An error has occurred when updating: {{ updateTodoQuery.error() }}.
    }
    @if (deleteTodoQuery.isError()) {
      An error has occurred when deleting: {{ deleteTodoQuery.error() }}.
    }
    @if (updateTodoQuery.isError() || deleteTodoQuery.isError()) {
      To reload the todo item:
      <button (click)="reload()">Reload</button>
    }
    @if (
      todoSignal() &&
      !updateTodoQuery.isPending() &&
      !deleteTodoQuery.isPending() &&
      !updateTodoQuery.isError() &&
      !deleteTodoQuery.isError()
    ) {
      {{ todoSignal()!.title }}
      <button (click)="update(todoSignal()!.id)">Update</button>
      <button (click)="delete(todoSignal()!.id)">Delete</button>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 3px;
        .error {
          color: red;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  todoQuery = inject(TodoQuery);

  todoSignal: WritableSignal<Todo | undefined> = signal(undefined);

  @Input({ required: true }) set todo(todo: Todo) {
    this.todoSignal.set(todo);
  }

  updateTodoQuery = this.todoQuery.injectTodoUpdate();

  deleteTodoQuery = this.todoQuery.injectTodoDelete();

  update(todoId: number) {
    this.updateTodoQuery.mutate(todoId);
  }

  delete(todoId: number) {
    this.deleteTodoQuery.mutate(todoId);
  }

  reload() {
    this.updateTodoQuery.reset();
    this.deleteTodoQuery.reset();
  }
}
