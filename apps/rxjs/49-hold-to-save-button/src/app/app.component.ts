import { Component } from '@angular/core';
import { SaveRequestComponent } from './components/save-request/save-request.component';

@Component({
  standalone: true,
  imports: [SaveRequestComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
