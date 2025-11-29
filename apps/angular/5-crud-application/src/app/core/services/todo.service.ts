import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ToDo } from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  getTodoList(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>('/todos');
  }

  updateTodo(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(
      `/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(todo: ToDo): Observable<ToDo> {
    return this.http.delete<ToDo>(`/todos/${todo.id}`);
  }
}
