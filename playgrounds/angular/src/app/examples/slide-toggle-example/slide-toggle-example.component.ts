import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, startWith, take} from 'rxjs';

@Component({
  selector: 'app-slide-toggle-example',
  templateUrl: './slide-toggle-example.component.html',
  styleUrls: ['./slide-toggle-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleExampleComponent {
  private valueSubject = new BehaviorSubject(true);

  value$ = this.valueSubject.asObservable();

  form = new FormGroup({
    toggleControl: new FormControl(true),
  });

  formValue$ = this.form.valueChanges.pipe(startWith(this.form.value));

  onValueChanged(value: any): void {
    this.valueSubject.next(value);
  }

  toggleValueOutside(): void {
    this.valueSubject.pipe(take(1)).subscribe((value) => this.valueSubject.next(!value));
  }
}
