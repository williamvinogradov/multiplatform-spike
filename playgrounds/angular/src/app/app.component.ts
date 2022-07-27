import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, startWith, take} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private valueSubject = new BehaviorSubject(true);

  value$ = this.valueSubject.asObservable();

  form = new FormGroup({
    toggleControl: new FormControl(true),
  });
  formValue$ = this.form.valueChanges.pipe(startWith(this.form.value));

  onValueChanged(value: boolean): void {
    this.valueSubject.next(value);
  }

  toggleValueOutside(): void {
    this.valueSubject.pipe(take(1)).subscribe((value) => this.valueSubject.next(!value));
  }
}
