import { Component, input, output } from '@angular/core';
import { ToDo } from '../../models/todo';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  host: {
    '[class.is-update]': 'isBusy()',
  },
})
export class TodoComponent {
  data = input.required<ToDo>();
  isBusy = input<boolean>(false);

  update = output<ToDo>();
  delete = output<ToDo>();

  onUpdate(): void {
    this.update.emit(this.data());
  }

  onDelete(): void {
    this.delete.emit(this.data());
  }
}
