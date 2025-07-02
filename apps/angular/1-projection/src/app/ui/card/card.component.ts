import { CommonModule } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <ng-content select="[cover]"></ng-content>

    <section>
      @for (item of list(); track item) {
        <ng-container
          *ngTemplateOutlet="
            viewTemplate();
            context: { $implicit: item }
          "></ng-container>
      }
    </section>
    <ng-content select="[addButton]"></ng-content>
  `,
  imports: [CommonModule],
  styles: [
    `
      :host.my-custom-class {
        background: rgb(200, 0, 0, 0.1) !important;
      }
    `,
  ],
  host: {
    class:
      'my-custom-class flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent {
  readonly list = input<any[] | null>(null);

  readonly viewTemplate = contentChild.required('listTemplate', {
    read: TemplateRef,
  });
}
