import { Directive, inject } from '@angular/core';
import { FakeHttpService } from '../data-access/fake-http.service';
import { CommonStore, DataStore } from './common.store';

@Directive()
export abstract class CommonData<T extends DataStore> {
  protected fakeHttpService = inject(FakeHttpService);
  protected store = inject(CommonStore<T>);

  protected data$ = this.store.getAll;

  abstract addItem(): void;

  deleteItem(id: number): void {
    this.store.deleteItem(id);
  }
}
