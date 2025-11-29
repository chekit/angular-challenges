import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <p>{{ message() }}</p>
  `,
  styles: `
    :host {
      display: block;
      padding: 20px;
      margin: 0 10px;
      border: 1px solid rgba(255, 74, 74, 1);
      background-color: #ffa6a6ff;
      border-radius: 8px;
      font-size: 0.625rem;
    }

    p {
      margin: 0;
      font-size: 1.4em;
      color: #181818;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.2);
    }
  `,
})
export class ErrorMessageComponent {
  message = input.required<string>();
}
