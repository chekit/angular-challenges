import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TodoComponent } from './components/todo/todo.component';
import { GlobalErrorService } from './core/services/error.service';
import { TodoService } from './core/services/todo.service';
import { ToDo } from './models/todo';

@Component({
  imports: [ErrorMessageComponent, LoaderComponent, TodoComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);
  private errorService = inject(GlobalErrorService);

  error = this.errorService.error;
  todos = signal<ToDo[]>([]);

  protected state = signal({
    isUpdating: -1,
    isLoading: true,
  });
  loading = computed(() => this.state().isLoading);

  ngOnInit(): void {
    this.todoService
      .getTodoList()
      .pipe(
        finalize(() => {
          this.state.update((state) => ({ ...state, isLoading: false }));
        }),
      )
      .subscribe((todos) => {
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

  reloadData() {
    this.state.update((state) => ({ ...state, isLoading: true }));

    this.todoService
      .getTodoList()
      .pipe(
        finalize(() => {
          this.state.update((state) => ({ ...state, isLoading: false }));
        }),
      )
      .subscribe((todos) => {
        this.todos.set(todos);
      });
  }
}
