import { Component } from '@angular/core';
import { HoldToSaveButtonComponent } from './components/hold-to-save-button/hold-to-save-buttoncomponent';

@Component({
  standalone: true,
  imports: [HoldToSaveButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
