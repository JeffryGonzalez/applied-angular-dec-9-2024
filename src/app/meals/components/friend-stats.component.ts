import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FriendsStore } from '../services/friends.store';

@Component({
  selector: 'app-friend-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @let stats = store.stats();
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Number of Friends</div>
        <div class="stat-value">{{ stats.total }}</div>
        <button
          [disabled]="store.filter() === 'all'"
          (click)="store.setFilter('all')"
          class="btn btn-sm"
        >
          Filter
        </button>
      </div>
      <div class="stat">
        <div class="stat-title">Friends That Owe You</div>
        <div class="stat-value">{{ stats.owe }}</div>
        <button
          [disabled]="store.filter() === 'oweYou'"
          (click)="store.setFilter('oweYou')"
          class="btn btn-sm"
        >
          Filter
        </button>
      </div>
      <div class="stat">
        <div class="stat-title">Friends You Owe</div>
        <div class="stat-value">{{ stats.youOwe }}</div>
        <button
          [disabled]="store.filter() === 'youOwe'"
          (click)="store.setFilter('youOwe')"
          class="btn btn-sm"
        >
          Filter
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class FriendStatsComponent {
  store = inject(FriendsStore);
}
