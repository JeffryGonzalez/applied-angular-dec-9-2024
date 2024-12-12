import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFriendCount, selectHasFriends } from '../shared/state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [RouterLink],
  template: `
    <h1 class="text-3xl font-black pb-8">Your Dashboard</h1>
    @if (hasFriends()) {
      <p>
        You have {{ friendCount() }} friends!
        <a class="link link-success" [routerLink]="['..', 'meals', 'list']"
          >You Should Get Together With Them</a
        >
      </p>
    } @else {
      <p>
        Bummer! You don't have any friends yet! You should
        <a class="link link-success" [routerLink]="['..', 'meals', 'create']"
          >Add Some Friends</a
        >
      </p>
    }
  `,
  styles: ``,
})
export class HomeComponent {
  friendCount = inject(Store).selectSignal(selectFriendCount);
  hasFriends = inject(Store).selectSignal(selectHasFriends);
}
