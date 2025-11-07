import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ToDo } from './models/todo';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos; track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  todos!: ToDo[];

  ngOnInit(): void {
    this.http
      .get<ToDo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  update(todo: ToDo) {
    this.http
      .put<ToDo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
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
      )
      .subscribe((todoUpdated: ToDo) => {
        this.todos[todoUpdated.id - 1] = todoUpdated;
      });
  }
}
