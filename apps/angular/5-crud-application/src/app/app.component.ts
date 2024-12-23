import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Todo } from './model/todo.model';
import { TodoService } from './service/todo.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }} - {{ todo.userId }}
      <button (click)="update(todo.id)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe((todos) => this.todos.set(todos));
  }

  update(id: number) {
    this.todoService.updateTodo(id).subscribe((todo) =>
      this.todos.update((todos) =>
        todos.map((t) => {
          if (t.id !== id) return t;
          else return todo;
        }),
      ),
    );
  }

  delete(id: number) {
    this.todoService.deleteTodo(id);
    this.todos.update((todos) => todos.filter((t) => t.id !== id));
  }
}
