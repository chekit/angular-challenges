import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonStore } from '../../common/common.store';
import { CommonData } from '../../common/commonData.directive';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="data$()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" cover />
      <ng-template #listTemplate let-item>
        <app-list-item [name]="item.firstName + ' ' + item.lastName">
          <button (click)="deleteItem(item.id)" deleteButton>
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem()"
        addButton>
        Add
      </button>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  providers: [{ provide: CommonStore, useClass: StudentStore }],
  standalone: true,
})
export class StudentCardComponent
  extends CommonData<Student>
  implements OnInit
{
  override addItem(): void {
    this.store.addItem(randStudent());
  }

  ngOnInit(): void {
    this.fakeHttpService.fetchStudents$.subscribe((s) =>
      this.store.setItems(s),
    );
  }
}
