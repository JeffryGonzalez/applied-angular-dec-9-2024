import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FriendsStore } from '../services/friends.store';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  template: `
    <div class="grid grid-cols-4">
      <ul class="col-span-1">
        @for (friend of store.friendList(); track friend.id) {
          <li class="flex flex-col gap-4">
            <a
              [routerLink]="[friend.id]"
              class="btn m-4"
              [routerLinkActive]="['btn-primary']"
            >
              {{ friend.name }}
            </a>
          </li>
        } @empty {
          <p>Sorry, no friends! So Sad!</p>
        }
      </ul>
      <div class="col-span-3">
        <router-outlet />
      </div>
    </div>
  `,
  styles: ``,
})
export class FriendListComponent {
  store = inject(FriendsStore);
}
