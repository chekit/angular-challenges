import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  input,
  numberAttribute,
  viewChild,
} from '@angular/core';
import {
  Observable,
  Subject,
  fromEvent,
  interval,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-save-request',
  templateUrl: './save-request.component.html',
  styleUrl: './save-request.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveRequestComponent implements OnInit {
  duration = input<number, unknown>(100, {
    transform: numberAttribute,
  });

  private progressBar = viewChild.required<HTMLProgressElement, ElementRef>(
    'progressBar',
    { read: ElementRef },
  );
  private sendButton = viewChild.required<HTMLButtonElement, ElementRef>(
    'sendButton',
    { read: ElementRef },
  );

  resetTimerFlag$ = new Subject<void>();

  ngOnInit(): void {
    this.assignMousedownListener(this.resetTimerFlag$);
    this.assignMouseupListener();
  }

  onSend() {
    console.log('Save it!');
  }

  private assignMousedownListener(stopper: Observable<void>): void {
    fromEvent(this.sendButton().nativeElement, 'mousedown')
      .pipe(
        switchMap(() => interval(this.duration())),
        takeUntil(stopper),
      )
      .subscribe({
        next: (value) => {
          if (this.progressBar()) {
            const currentValue = this.progressBar().nativeElement.value;
            if (currentValue < 100) {
              this.updateProgressBar(currentValue + value);
            } else {
              this.onSend();
              this.updateProgressBar(0);
              this.resetTimerFlag();
            }
          }
        },
      });
  }

  private assignMouseupListener(): void {
    fromEvent(this.sendButton().nativeElement, 'mouseup').subscribe(() => {
      this.resetTimerFlag();
      this.updateProgressBar(0);
      this.assignMousedownListener(this.resetTimerFlag$);
      this.sendButton().nativeElement.disabled = false;
    });
  }

  private resetTimerFlag(): void {
    this.resetTimerFlag$.next();
    this.resetTimerFlag$.complete();
    this.resetTimerFlag$ = new Subject<void>();
  }

  private updateProgressBar(value: number): void {
    this.progressBar().nativeElement.value = value;
  }
}
