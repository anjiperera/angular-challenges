import { inject, Injectable } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { TodoService } from './todo.service';

@Injectable({ providedIn: 'root' })
export class TodoQuery {
  todoService = inject(TodoService);

  todoKeys = {
    all: ['todos'] as const,
    byId: (id: number) => ['todo', id] as const,
  };

  injectAllTodos = () => {
    return injectQuery(() => ({
      queryKey: this.todoKeys.all,
      queryFn: async () => lastValueFrom(this.todoService.getAllTodos()),
    }));
  };

  injectTodoUpdate = () => {
    return injectMutation((client) => ({
      mutationFn: (todoId: number) =>
        lastValueFrom(this.todoService.update(todoId)),
      onSuccess: () =>
        client.invalidateQueries({ queryKey: this.todoKeys.all }),
    }));
  };

  injectTodoDelete = () => {
    return injectMutation((client) => ({
      mutationFn: (todoId: number) =>
        lastValueFrom(this.todoService.delete(todoId)),
      onSuccess: () =>
        client.invalidateQueries({ queryKey: this.todoKeys.all }),
    }));
  };
}
