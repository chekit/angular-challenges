import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonStore } from '../../common/common.store';
import { CommonData } from '../../common/commonData.directive';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  template: `
    <app-card [list]="data$()">
      <img
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        priority
        cover />
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem()"
        addButton>
        Add
      </button>
      <ng-template #listTemplate let-item>
        <app-list-item [name]="item.firstName">
          <button (click)="deleteItem(item.id)" deleteButton>
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  providers: [{ provide: CommonStore, useClass: TeacherStore }],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent
  extends CommonData<Teacher>
  implements OnInit
{
  override addItem(): void {
    this.store.addItem(randTeacher());
  }

  ngOnInit(): void {
    this.fakeHttpService.fetchTeachers$.subscribe((t) =>
      this.store.setItems(t),
    );
  }
}
