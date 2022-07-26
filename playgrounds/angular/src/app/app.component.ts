import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private valueSubject = new BehaviorSubject(true);

  value$ = this.valueSubject.asObservable();

  onValueChanged(value: boolean): void {
    this.valueSubject.next(value);
  }

  toggleValueOutside(): void {
    this.valueSubject.pipe(take(1)).subscribe((value) => this.valueSubject.next(!value));
  }
}
