import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { FriendsStore } from '../services/friends.store';
import { Friend } from '../types';

@Component({
  selector: 'app-friend-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (friend()) {
      @let name = friend().name;
      <div class="card bg-base-100  shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{{ friend().name }}</h2>
          @if (friend().boughtLastTime) {
            <p>{{ friend().name }} bought last time</p>
          } @else {
            <p>You bought last time</p>
          }
          <div class="card-actions justify-end">
            <button
              (click)="store.boughtForSelectedUser()"
              class="btn btn-primary"
            >
              You just bought for {{ name }}
            </button>
            <button
              (click)="store.selectedUserJustBoughtForMe()"
              class="btn btn-primary"
            >
              {{ name }} Just bought
            </button>
          </div>
        </div>
      </div>
    } @else {
      <p>Four Oh Four</p>
    }
  `,
  styles: ``,
})
export class FriendDetailsComponent {
  id = input.required<string>();

  store = inject(FriendsStore);

  friend = this.store.selectedFriendInfo;

  toggleTheFriend(friend: Friend) {
    friend.boughtLastTime = !friend.boughtLastTime;
  }
  constructor() {
    effect(() => {
      // only used in a constructor (or other "injection context")
      if (this.id()) {
        this.store.setSelectedFriend(this.id()); // this won't work.
      }
    });
  }
}
