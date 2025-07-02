import { Injectable } from '@angular/core';
import { CommonStore } from '../common/common.store';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends CommonStore<Student> {}
