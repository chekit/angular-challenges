import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';

const TODOS_STUB = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
];

const TODO_UPDATE = { ...TODOS_STUB[1], title: 'test', completed: true };

describe('App Component', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: TodoService,
          useValue: {
            getTodoList: jest.fn().mockReturnValue(of(TODOS_STUB)),
            updateTodo: jest.fn().mockReturnValue(of(TODO_UPDATE)),
          },
        },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should update todo in the list', waitForAsync(() => {
    fixture.detectChanges();

    component.update(TODO_UPDATE);

    expect(component.todos()[TODO_UPDATE.id - 1].title).toBe(TODO_UPDATE.title);
  }));
});
