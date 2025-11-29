import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService {
  private errorMessage = signal<string>('');

  error = computed(() => this.errorMessage());

  setError(message: string): void {
    this.errorMessage.set(message);
  }

  resetError(): void {
    this.errorMessage.set('');
  }
}
