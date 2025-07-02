import { Injectable } from '@angular/core';
import { CommonStore } from '../common/common.store';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends CommonStore<City> {}
