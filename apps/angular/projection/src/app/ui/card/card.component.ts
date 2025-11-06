import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[cover]" />
    <br />
    <section>
      @for (item of list(); track item.id) {
        <ng-container
          [ngTemplateOutlet]="listItemTmpl()"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </section>
    <br />
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="this.addNewItem.emit()">
      Add
    </button>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  list = input<any>([]);

  listItemTmpl = contentChild.required('cardRow', { read: TemplateRef });

  protected addNewItem = output<void>();
}
