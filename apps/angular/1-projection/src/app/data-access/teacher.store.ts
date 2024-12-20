import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  teachers = signal<Teacher[]>([]);

  addAll(teachers: Teacher[]) {
    this.teachers.update((ts) => [...ts, ...teachers]);
  }

  addOne(teacher: Teacher) {
    this.teachers.update((ts) => [...ts, teacher]);
  }

  deleteOne(id: number) {
    this.teachers.update((ts) => ts.filter((t) => t.id !== id));
  }
}
