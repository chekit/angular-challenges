import { Signal, signal } from '@angular/core';

export interface DataStore {
  id: number;
}

export class CommonStore<T extends DataStore> {
  protected readonly items = signal<T[]>([]);

  get getAll(): Signal<T[]> {
    return this.items;
  }

  setItems(item: T[]): void {
    this.items.set(item);
  }

  addItem(item: T): void {
    this.items.set([...this.items(), item]);
  }

  deleteItem(id: number): void {
    this.items.set(this.items().filter((k: any) => k.id !== id));
  }
}
