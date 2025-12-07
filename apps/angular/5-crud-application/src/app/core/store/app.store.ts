import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ToDo } from '../../models/todo';

interface AppState {
  isUpdating: number;
  isLoading: boolean;
  data: ToDo[];
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  constructor() {
    super({
      isUpdating: -1,
      isLoading: true,
      data: [],
    });
  }
}
