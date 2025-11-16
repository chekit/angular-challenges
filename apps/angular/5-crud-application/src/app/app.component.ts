import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ToDo } from './models/todo';
import { TodoService } from './services/todo.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div class="todo" [class.is-update]="todo.id === state().isUpdating">
        <h2 class="todo__title">
          {{ todo.title }}
        </h2>
        <div class="manage">
          <button class="todo__button is-secondary" (click)="delete(todo)">
            Delete
          </button>
          <button
            class="todo__button"
            (click)="update(todo)"
            [disabled]="todo.id === state().isUpdating"
            data-test="update-btn">
            Update
          </button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 5px 15px;
      }

      .todo {
        padding: 8px;
        margin: 0 0 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .todo__title {
        margin: 0 0 10px;
        font-size: 18px;
        font-weight: 800;
      }

      .todo__button {
        padding: 5px 10px;
        border: 1px solid #aaa;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
      }

      .todo__button:active {
        box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.28);
      }

      .is-secondary {
        background-color: white;
        border: 1px solid #ccc;
      }

      .is-update {
        position: relative;
        overflow: hidden;
        pointer-events: none;
      }

      .is-update::after {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
        text-align: center;
        color: white;
        content: 'Updating...';
      }

      .manage {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);

  todos = signal<ToDo[]>([]);

  protected state = signal({
    isUpdating: -1,
  });

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: ToDo) {
    this.state.update((state) => ({ ...state, isUpdating: todo.id }));

    this.todoService
      .updateTodo(todo)
      .pipe(
        finalize(() =>
          this.state.update((state) => ({ ...state, isUpdating: -1 })),
        ),
      )
      .subscribe((todoUpdated: ToDo) => {
        this.todos.update((todos) => [
          ...todos.slice(0, todoUpdated.id - 1),
          todoUpdated,
          ...todos.slice(todoUpdated.id),
        ]);
      });
  }

  delete(todo: ToDo): void {
    this.state.update((state) => ({ ...state, isUpdating: todo.id }));

    this.todoService
      .updateTodo(todo)
      .pipe(
        finalize(() =>
          this.state.update((state) => ({ ...state, isUpdating: -1 })),
        ),
      )
      .subscribe((todoUpdated: ToDo) => {
        this.todos.update((todos) => todos.filter(({ id }) => id !== todo.id));
      });
  }
}
