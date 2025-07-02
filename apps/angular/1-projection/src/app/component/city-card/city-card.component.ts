import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonStore } from '../../common/common.store';
import { CommonData } from '../../common/commonData.directive';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="data$()" customClass="bg-light-green">
      <img ngSrc="assets/img/city.png" width="200" height="200" cover />

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addItem()"
        addButton>
        Add
      </button>
      <ng-template #listTemplate let-item>
        <app-list-item [name]="item.name">
          <button (click)="deleteItem(item.id)" deleteButton>
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  providers: [{ provide: CommonStore, useClass: CityStore }],
  standalone: true,
})
export class CityCardComponent extends CommonData<City> implements OnInit {
  override addItem(): void {
    this.store.addItem(randomCity());
  }

  ngOnInit(): void {
    this.fakeHttpService.fetchCities$.subscribe((res) =>
      this.store.setItems(res),
    );
  }
}
