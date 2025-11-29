import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <p>Loading...</p>
  `,
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      background-color: rgba(113, 113, 113, 0.45);
      color: white;
    }
  `,
})
export class LoaderComponent {}
