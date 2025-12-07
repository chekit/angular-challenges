import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { GlobalErrorService } from './core/services/error.service';
import { TodoService } from './core/services/todo.service';
import { AppStore } from './core/store/app.store';

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

const TODO_UNDER_TEST = { ...TODOS_STUB[1], title: 'test', completed: true };

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
            updateTodo: jest.fn().mockReturnValue(of(TODO_UNDER_TEST)),
          },
        },
        AppStore,
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should update todo in the list', waitForAsync(() => {
    fixture.detectChanges();

    component.update(TODO_UNDER_TEST);

    expect(component.todos()[TODO_UNDER_TEST.id - 1].title).toBe(
      TODO_UNDER_TEST.title,
    );
  }));

  it('should remove todo from the list', () => {
    const expected = TODOS_STUB.filter(({ id }) => id !== TODO_UNDER_TEST.id);
    fixture.detectChanges();

    component.delete(TODO_UNDER_TEST);

    expect(component.todos()).toEqual(expected);
  });

  it('should show error message', () => {
    const errorService = TestBed.inject(GlobalErrorService);
    errorService.setError('Test error');

    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(
      By.css('[data-test="error-message"]'),
    );
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toBe('Test error');
  });

  it('should reload content', () => {
    const errorService = TestBed.inject(GlobalErrorService);
    errorService.setError('Test error');

    const todoService = TestBed.inject(TodoService);
    const getTodoListSpy = jest.spyOn(todoService, 'getTodoList');

    fixture.detectChanges();

    const reloadButton = fixture.debugElement.query(
      By.css('[data-test="reload-button"]'),
    );
    expect(reloadButton).toBeTruthy();

    getTodoListSpy.mockClear();

    expect(getTodoListSpy).not.toHaveBeenCalled();

    reloadButton.triggerEventHandler('click');

    expect(getTodoListSpy).toHaveBeenCalled();
  });
});
