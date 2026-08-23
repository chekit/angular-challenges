import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { finalize } from 'rxjs';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TodoComponent } from './components/todo/todo.component';
import { GlobalErrorService } from './core/services/error.service';
import { TodoService } from './core/services/todo.service';
import { AppStore } from './core/store/app.store';
import { ToDo } from './models/todo';

@Component({
  imports: [ErrorMessageComponent, LoaderComponent, TodoComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `
    @for (todo of todos; track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);
  private errorService = inject(GlobalErrorService);
  private appStore = inject(AppStore);

  error = this.errorService.error;

  isUpdating = this.appStore.selectSignal((state) => state.isUpdating);
  isLoading = this.appStore.selectSignal((state) => state.isLoading);
  todos = this.appStore.selectSignal((state) => state.data);

  ngOnInit(): void {
    this.todoService
      .getTodoList()
      .pipe(
        finalize(() => {
          this.appStore.setState((state) => ({ ...state, isLoading: false }));
        }),
      )
      .subscribe((todos) => {
        this.appStore.setState((state) => ({ ...state, data: todos }));
      });
  }

  update(todo: ToDo) {
    this.appStore.setState((state) => ({
      ...state,
      isUpdating: todo.id,
    }));

    this.todoService
      .updateTodo(todo)
      .pipe(
        finalize(() =>
          this.appStore.setState((state) => ({
            ...state,
            isUpdating: -1,
          })),
        ),
      )
      .subscribe((todoUpdated: ToDo) => {
        this.appStore.setState((state) => ({
          ...state,
          data: [
            ...state.data.slice(0, todoUpdated.id - 1),
            todoUpdated,
            ...state.data.slice(todoUpdated.id),
          ],
        }));
      });
  }

  delete(todo: ToDo): void {
    this.appStore.setState((state) => ({
      ...state,
      isUpdating: todo.id,
    }));

    this.todoService
      .updateTodo(todo)
      .pipe(
        finalize(() =>
          this.appStore.setState((state) => ({
            ...state,
            isUpdating: -1,
          })),
        ),
      )
      .subscribe(() => {
        this.appStore.setState((state) => ({
          ...state,
          data: state.data.filter(({ id }) => id !== todo.id),
        }));
      });
  }

  reloadData() {
    this.appStore.setState((state) => ({
      ...state,
      isLoading: true,
    }));

    this.todoService
      .getTodoList()
      .pipe(
        finalize(() => {
          this.appStore.setState((state) => ({
            ...state,
            isLoading: false,
          }));
        }),
      )
      .subscribe((todos) => {
        this.appStore.setState((state) => ({
          ...state,
          data: todos,
        }));
      });
  }
}
