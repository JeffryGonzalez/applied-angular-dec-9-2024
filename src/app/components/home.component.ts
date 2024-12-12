import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectFriendCount,
  selectHasFriends,
  selectMealActivity,
} from '../shared/state';
import { RouterLink } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [RouterLink, FeatureDirective],
  template: `
    <h1 class="text-3xl font-black pb-8">Your Dashboard</h1>
    <div *feature="'home-meal-summary'">
      @if (hasFriends()) {
        <p>
          You have {{ friendCount() }} friends!
          <a class="link link-success" [routerLink]="['..', 'meals', 'list']"
            >You Should Get Together With Them</a
          >
        </p>
        @if (activity().length) {
          <p>Todays Acttivity</p>
          <ul>
            @for (a of activity(); track $index) {
              <li>{{ a }}</li>
            }
          </ul>
        }
        <div></div>
      } @else {
        <p>
          Bummer! You don't have any friends yet! You should
          <a class="link link-success" [routerLink]="['..', 'meals', 'create']"
            >Add Some Friends</a
          >
          (Note: This is a somewhat intention bug.)
        </p>
      }
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  store = inject(Store);
  friendCount = this.store.selectSignal(selectFriendCount);
  hasFriends = this.store.selectSignal(selectHasFriends);
  activity = this.store.selectSignal(selectMealActivity);
}
