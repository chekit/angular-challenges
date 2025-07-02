import { Injectable } from '@angular/core';
import { CommonStore } from '../common/common.store';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends CommonStore<Teacher> {}
